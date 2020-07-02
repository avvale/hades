import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { AggregateBase } from '@hades/shared/domain/lib/aggregate-base';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { SequelizeMapper } from './sequelize.mapper';

export abstract class SequelizeRepository<Aggregate extends AggregateBase>
{
    public readonly repository: any;
    public readonly criteria: ICriteria;
    public readonly entityName: string;
    public readonly mapper: SequelizeMapper;

    builder(): Object
    {
        return {}
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<Aggregate>>
    {
        // get count total records from sql service library
        const total = await this.repository.count(
            this.criteria.implements(constraint, this.builder())
        );

        const { count, rows } = await this.repository.findAndCountAll(
            this.criteria.implements(constraint.concat(queryStatements), this.builder())
        );

        return { 
            total, 
            count, 
            rows: <Aggregate[]>this.mapper.mapToAggregate(rows) // map values to create value objects
        };
    }
    
    async create(entity: Aggregate): Promise<void>
    {
        // check if exist object in database, if allow save entity with the same uuid, update this entity in database instead of create it
        const entityInDB = await this.repository.findOne(
            {
                where: {
                    id: entity['id']['value']
                }
            }
        );
        
        if (entityInDB) throw new ConflictException(`Error to create ${this.entityName}, the id ${entity['id']['value']} already exist in database`);
        
        try
        {
            await this.repository.create(entity.toDTO());
        }
        catch (error) 
        {
            throw new ConflictException(error.message);
        }
    }

    async insert(entities: Aggregate[]): Promise<void>
    {
        await this.repository.bulkCreate(entities.map(item => item.toDTO()));
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<Aggregate> 
    {
        const entity = await this.repository.findOne(
            this.criteria.implements(queryStatements, this.builder())
        );

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        // map value to create value objects
        return <Aggregate>this.mapper.mapToAggregate(entity);
    }

    async findById(id: UuidValueObject): Promise<Aggregate>
    {
        // value is already mapped
        const entity = await this.repository.findOne(
            {
                where: {
                    id: id.value
                }
            }
        );

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        return <Aggregate>this.mapper.mapToAggregate(entity);
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<Aggregate[]> 
    {
        const entities = await this.repository.findAll(
            this.criteria.implements(queryStatements, this.builder())
        );

        // map values to create value objects
        return <Aggregate[]>this.mapper.mapToAggregate(entities);
    }

    async update(entity: Aggregate): Promise<void> 
    { 
        // check that entity exist
        const entityInDB = await this.repository.findOne(
            {
                where: {
                    id: entity['id']['value']
                }
            }
        );

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        // clean undefined fields
        const objectLiteral = this.cleanUndefined(entity.toDTO());

        await entityInDB.update(objectLiteral);
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that entity exist
        const entity = await this.repository.findOne(
            {
                where: {
                    id: id.value
                }
            }
        );

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        await entity.destroy();
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);

        // check that entity exist
        await this.repository.destroy(
            this.criteria.implements(queryStatements, this.builder())
        );
    }

    cleanUndefined(entity: ObjectLiteral): ObjectLiteral
    {
        // clean properties object from undefined values
        for (const property in entity )
        {
            // can to be null for nullable values
            if (entity[property] === undefined) delete entity[property];
        }
        return entity;
    }
}