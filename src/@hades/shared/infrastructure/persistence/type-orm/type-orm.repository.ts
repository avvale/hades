import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder, DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Command, Operator, QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { Uuid } from '@hades/shared/domain/value-objects/uuid';
import { BaseEntity } from '@hades/shared/domain/lib/base-entity';
import { TypeOrmMapper } from './type-orm.mapper';

export abstract class TypeOrmRepository<Entity extends BaseEntity>
{
    public readonly repository: Repository<Entity>;
    public readonly criteriaService: ICriteria;
    public readonly entityName: string;
    public readonly mapper: TypeOrmMapper;

    builder(): SelectQueryBuilder<Entity>
    {
        return this.repository.createQueryBuilder(this.repository.metadata.tableName)
    }
    
    async save(entity: Entity): Promise<void>
    {
        // check if exist object in database, if allow save entity with the same uuid, update this entity in database instead of create it
        const entityInDB = await this
            .criteriaService
            .implements(this.builder(), [
                {
                    command: Command.WHERE,
                    operator: Operator.EQUALS,
                    column: this.repository.metadata.tableName + '.id',
                    value: entity['id']['value']
                }
            ])
            .getOne();

        if (entityInDB) throw new ConflictException(`Error to create ${this.entityName}, the id ${entity['id']['value']} already exist in database`);
        
        try
        {
            await this.repository.save(<DeepPartial<Entity>>entity.toObject());
        }
        catch (error) 
        {
            throw new ConflictException(error.message);
        }       
    }

    async insert(entities: Entity[]): Promise<void>
    {
        await this.repository.insert(<(QueryDeepPartialEntity<Entity>[])>(entities.map(item => item.toObject())));
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<Entity> 
    {
        const entity = await this
            .criteriaService
            .implements(this.builder(), queryStatements)
            .getOne();

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        // map value to create value objects
        return <Entity>this.mapper.mapToValueObject(entity);
    }

    async findById(id: Uuid): Promise<Entity>
    {
        // value is already mapped
        return await this.find([
                {
                    command: Command.WHERE,
                    operator: Operator.EQUALS,
                    column: this.repository.metadata.tableName + '.id',
                    value: id.value
                }
            ]);
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<Entity[]> 
    {
        const entities = await this.criteriaService
            .implements(this.builder(), queryStatements)
            .getMany();

        // map values to create value objects
        return <Entity[]>this.mapper.mapToValueObject(entities);
    }

    async update(entity: Entity): Promise<void> 
    { 
        // check that entity exist
        await this.findById(entity['id']);

        // clean undefined fields
        const objectLiteral = this.cleanUndefined(entity.toObject());

        await this.repository.save(<DeepPartial<Entity>>objectLiteral);
    }

    async delete(id: Uuid): Promise<void> 
    {
        // check that entity exist
        await this.findById(id);

        await this.builder()
            .delete()
            .where(this.repository.metadata.tableName + '.id = :id', { id: id.value })
            .execute();
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