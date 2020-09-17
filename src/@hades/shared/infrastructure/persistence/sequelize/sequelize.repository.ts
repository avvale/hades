import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { FindOptions } from 'sequelize/types';
import { Model } from 'sequelize-typescript';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { AggregateBase } from '@hades/shared/domain/lib/aggregate-base';
import { Pagination } from '@hades/shared/domain/lib/pagination';

export abstract class SequelizeRepository<Aggregate extends AggregateBase, ModelClass>
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
        const modelInDB = await this.repository.findOne(
            {
                where: {
                    id: aggregate['id']['value']
                }
            }
        );
        
        if (modelInDB) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${aggregate['id']['value']} already exist in database`);
        
        try
        {
            const model = await this.repository.create(aggregate.toDTO());

            this.createdAggregateHook(aggregate, model);
        }
        catch (error) 
        {
            throw new ConflictException(error.message);
        }
    }

    // hook called after create aggregate
    createdAggregateHook(aggregate: Aggregate, model: Model<ModelClass>) {}

    async insert(aggregates: Aggregate[], options: object = {}): Promise<void>
    {
        await this.repository.bulkCreate(aggregates.map(item => item.toDTO()), options);
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<Aggregate> 
    {
        const model = await this.repository.findOne(
            this.criteria.implements(queryStatements, this.builder())
        );

        if (!model) throw new NotFoundException(`${this.aggregateName} not found`);

        // map value to create value objects
        return <Aggregate>this.mapper.mapObjectToAggregate(model);
    }

    async findById(id: UuidValueObject): Promise<Aggregate>
    {
        // value is already mapped
        const model = await this.repository.findOne(
            this.composeStatementFindByIdHook( // call hook
                {
                    where: {
                        id: id.value
                    }
                }
            )
        );

        if (!model) throw new NotFoundException(`${this.aggregateName} with id: ${id.value}, not found`);

        return <Aggregate>this.mapper.mapObjectToAggregate(model);
    }

    // hook called after update aggregate
    composeStatementFindByIdHook(findOptions: FindOptions): FindOptions { return findOptions; }

    async get(queryStatements: QueryStatementInput[] = []): Promise<Aggregate[]> 
    {
        const models = await this.repository.findAll(
            this.criteria.implements(queryStatements, this.builder())
        );

        // map values to create value objects
        return <Aggregate[]>this.mapper.mapObjectsToAggregates(models);
    }

    async update(aggregate: Aggregate): Promise<void> 
    { 
        // check that model exist
        const modelInDB = await this.repository.findOne(
            {
                where: {
                    id: aggregate['id']['value']
                }
            }
        );

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        // clean undefined fields
        const objectLiteral = this.cleanUndefined(aggregate.toDTO());

        const model = await modelInDB.update(objectLiteral);

        this.updatedAggregateHook(aggregate, model);
    }

    // hook called after update aggregate
    updatedAggregateHook(aggregate: Aggregate, model: Model<ModelClass>) {}

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        const model = await this.repository.findOne(
            {
                where: {
                    id: id.value
                }
            }
        );

        if (!model) throw new NotFoundException(`${this.aggregateName} not found`);

        await model.destroy();
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