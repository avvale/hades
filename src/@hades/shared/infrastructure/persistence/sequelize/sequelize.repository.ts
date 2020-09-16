import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { AggregateBase } from '@hades/shared/domain/lib/aggregate-base';
import { Pagination } from '@hades/shared/domain/lib/pagination';

export abstract class SequelizeRepository<Aggregate extends AggregateBase>
{
    public readonly repository: any;
    public readonly criteria: ICriteria;
    public readonly aggregateName: string;
    public readonly mapper: IMapper;

    builder(): Object
    {
        return {}
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraints: QueryStatementInput[] = []): Promise<Pagination<Aggregate>>
    {
        // get count total records from sql service library
        const total = await this.repository.count(
            this.criteria.implements(constraints, this.builder())
        );

        const { count, rows } = await this.repository.findAndCountAll(
            this.criteria.implements(constraints.concat(queryStatements), this.builder())
        );

        return { 
            total, 
            count, 
            rows: <Aggregate[]>this.mapper.mapObjectsToAggregates(rows) // map values to create value objects
        };
    }
    
    async create(aggregate: Aggregate): Promise<void>
    {
        // check if exist object in database, if allow save aggregate with the same uuid, update this aggregate in database instead of create it
        const aggregateInDB = await this.repository.findOne(
            {
                where: {
                    id: aggregate['id']['value']
                }
            }
        );
        
        if (aggregateInDB) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${aggregate['id']['value']} already exist in database`);
        
        try
        {
            await this.repository.create(aggregate.toDTO());
        }
        catch (error) 
        {
            throw new ConflictException(error.message);
        }
    }

    async insert(entities: Aggregate[], options: object = {}): Promise<void>
    {
        await this.repository.bulkCreate(entities.map(item => item.toDTO()), options);
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<Aggregate> 
    {
        const aggregate = await this.repository.findOne(
            this.criteria.implements(queryStatements, this.builder())
        );

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        // map value to create value objects
        return <Aggregate>this.mapper.mapObjectToAggregate(aggregate);
    }

    async findById(id: UuidValueObject): Promise<Aggregate>
    {
        // value is already mapped
        const aggregate = await this.repository.findOne(
            {
                where: {
                    id: id.value
                }
            }
        );

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} with id: ${id.value}, not found`);

        return <Aggregate>this.mapper.mapObjectToAggregate(aggregate);
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<Aggregate[]> 
    {
        const entities = await this.repository.findAll(
            this.criteria.implements(queryStatements, this.builder())
        );

        // map values to create value objects
        return <Aggregate[]>this.mapper.mapObjectsToAggregates(entities);
    }

    async update(aggregate: Aggregate): Promise<void> 
    { 
        // check that aggregate exist
        const aggregateInDB = await this.repository.findOne(
            {
                where: {
                    id: aggregate['id']['value']
                }
            }
        );

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        // clean undefined fields
        const objectLiteral = this.cleanUndefined(aggregate.toDTO());

        await aggregateInDB.update(objectLiteral);
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        const aggregate = await this.repository.findOne(
            {
                where: {
                    id: id.value
                }
            }
        );

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        await aggregate.destroy();
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);

        // check that aggregate exist
        await this.repository.destroy(
            this.criteria.implements(queryStatements, this.builder())
        );
    }

    cleanUndefined(aggregate: ObjectLiteral): ObjectLiteral
    {
        // clean properties object from undefined values
        for (const property in aggregate )
        {
            // can to be null for nullable values
            if (aggregate[property] === undefined) delete aggregate[property];
        }
        return aggregate;
    }
}