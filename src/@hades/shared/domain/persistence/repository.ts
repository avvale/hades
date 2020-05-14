import { QueryStatementInput } from './sql-statement-input';
import { ValueObject } from './../value-objects/value-object';

// TODO, desacoplar typeorm del dominio
import { Repository, InsertResult } from 'typeorm';

export interface IRepository<Entity>
{
    repository: Repository<Entity>;
    
    // save a single record
    save(item: Entity): Promise<Entity>;

    // save a single or multiple records
    insert(items: Entity[]): Promise<InsertResult>;

    // find a single record
    find(query: QueryStatementInput[]): Promise<Entity | null>;

    // get multiple records
    get(query: QueryStatementInput[]): Promise<Entity[]>;

    // update record
    update(item: Entity): Promise<Entity>;
  
    // delete record
    delete(id: ValueObject<String>): Promise<Entity>;
}