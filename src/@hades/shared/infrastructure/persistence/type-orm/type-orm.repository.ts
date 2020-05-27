import { Repository, SelectQueryBuilder } from 'typeorm';
import { Command, Operator, QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Uuid } from '@hades/shared/domain/value-objects/uuid';

export abstract class TypeOrmRepository<Entity>
{
    public readonly repository: Repository<Entity>;
    public readonly criteriaService: ICriteria;
    public readonly entityName: string;

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
            await this.repository.save(entity);
        }
        catch (error) 
        {
            throw new ConflictException(error.message);
        }       
    }

    async insert(entity: Entity[]): Promise<void>
    {
        await this.repository.insert(entity);
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<Entity> 
    {
        const entity = await this
            .criteriaService
            .implements(this.builder(), queryStatements)
            .getOne();

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        return entity;
    }

    async findById(id: Uuid): Promise<Entity>
    {
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
        return await this
            .criteriaService
            .implements(this.builder(), queryStatements)
            .getMany();
    }

    async update(entity: Entity): Promise<void> 
    { 
        // check that entity exist
        await this.findById(entity['id']);

        // clean properties object from undefined values
        for (const property in entity )
        {
            if (entity[property] === null || entity[property]['value'] === undefined) delete entity[property];
        }

        await this.repository.update(entity['id'], entity);
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
}