import { QueryStatementInput } from './sql-statement-input';
import { ValueObject } from './../value-objects/value-object';
import { Pagination } from './../lib/pagination';

export interface IRepository<Entity>
{
    repository: any;
    
    // paginate records
    paginate(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<Entity>>;

    // create a single record
    create(item: Entity): Promise<void>;

    // create a single or multiple records
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
    delete(query: QueryStatementInput[]): Promise<void>;
  
    // delete record by id
    deleteById(id: ValueObject<String>): Promise<void>;
}