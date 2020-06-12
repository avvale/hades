import { ConflictException, NotFoundException } from '@nestjs/common';
import { Command, Operator, QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { Uuid } from '@hades/shared/domain/value-objects/uuid';
import { BaseEntity } from '@hades/shared/domain/lib/base-entity';
import { SequelizeOrmMapper } from './sequelize.mapper';

export abstract class SequelizeRepository<Entity extends BaseEntity>
{
    public readonly repository: any;
    public readonly criteriaService: ICriteria;
    public readonly entityName: string;
    public readonly mapper: SequelizeOrmMapper;

    /* builder(): SelectQueryBuilder<Entity>
    {
        return this.repository.createQueryBuilder(this.repository.metadata.tableName)
    } */
    
    async save(entity: Entity): Promise<void>
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
        // await this.repository.insert(<(QueryDeepPartialEntity<Entity>[])>(entities.map(item => item.toDTO())));
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<Entity> 
    {
        const entity = await this.repository.findOne();

        // console.log(entity.name);

        /* const entity = await this
            .criteriaService
            .implements(this.builder(), queryStatements)
            .getOne();

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        // map value to create value objects
        return <Entity>this.mapper.mapToValueObject(entity); */
        return entity;
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
        const entity = await this.repository.findAll(
            {
                where: {
                    id: id.value
                }
            }
        );

        /* const entities = await this.criteriaService
            .implements(this.builder(), queryStatements)
            .getMany();

        // map values to create value objects
        return <Entity[]>this.mapper.mapToValueObject(entities); */

        return;
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

    async delete(id: Uuid): Promise<void> 
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