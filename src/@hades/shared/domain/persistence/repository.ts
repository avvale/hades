import { QueryStatementInput } from './sql-statement-input';
import { ValueObject } from './../value-objects/value-object';

// TODO, desacoplar typeorm del dominio
import { Repository } from 'typeorm';

export interface IRepository<Entity>
{
    repository: Repository<Entity>;
    
    // save a single record
    save(item: Entity): Promise<void>;

    // save a single or multiple records
    insert(items: Entity[]): Promise<void>;

    // find a single record
    find(query: QueryStatementInput[]): Promise<Entity | null>;

    // find a single record by id
    findById(id: ValueObject<String>): Promise<Entity | null>;

    // get multiple records
    get(query: QueryStatementInput[]): Promise<Entity[]>;

    // update record
    update(item: Entity): Promise<void>;
  
    // delete record
    delete(id: ValueObject<String>): Promise<void>;
}