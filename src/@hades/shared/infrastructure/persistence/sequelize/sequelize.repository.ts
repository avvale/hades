import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { Uuid } from '@hades/shared/domain/value-objects/uuid';
import { BaseEntity } from '@hades/shared/domain/lib/base-entity';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { SequelizeMapper } from './sequelize.mapper';

export abstract class SequelizeRepository<Entity extends BaseEntity>
{
    public readonly repository: any;
    public readonly criteria: ICriteria;
    public readonly entityName: string;
    public readonly mapper: SequelizeMapper;

    builder(): Object
    {
        return {}
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraints: QueryStatementInput[] = []): Promise<Pagination<Entity>>
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
            rows: <Entity[]>this.mapper.mapToEntity(rows) // map values to create value objects
        };
    }
    
    async create(entity: Entity): Promise<void>
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

    async insert(entities: Entity[]): Promise<void>
    {
        await this.repository.bulkCreate(entities.map(item => item.toDTO()));
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<Entity> 
    {
        const entity = await this.repository.findOne(
            this.criteria.implements(queryStatements, this.builder())
        );

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        // map value to create value objects
        return <Entity>this.mapper.mapToEntity(entity);
    }

    async findById(id: Uuid): Promise<Entity>
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

        return <Entity>this.mapper.mapToEntity(entity);
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<Entity[]> 
    {
        const entities = await this.repository.findAll(
            this.criteria.implements(queryStatements, this.builder())
        );

        // map values to create value objects
        return <Entity[]>this.mapper.mapToEntity(entities);
    }

    async update(entity: Entity): Promise<void> 
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

    async deleteById(id: Uuid): Promise<void> 
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

    private cleanUndefined(entity: ObjectLiteral): ObjectLiteral
    {
        // clean properties object from undefined values
        for (const property in entity )
        {
            if (entity[property] === null || entity[property] === undefined) delete entity[property];
        }
        return entity;
    }
}