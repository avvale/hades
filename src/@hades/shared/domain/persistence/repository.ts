import { QueryStatementInput } from './sql-statement-input';
import { ValueObject } from './../value-objects/value-object';
import { Pagination } from './../lib/pagination';

export interface IRepository<Aggregate>
{
    repository: any;
    
    // paginate records
    paginate(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<Aggregate>>;

    // create a single record
    create(item: Aggregate): Promise<void>;

    // create a single or multiple records
    insert(items: Aggregate[]): Promise<void>;

    // find a single record
    find(query: QueryStatementInput[]): Promise<Aggregate | null>;

    // find a single record by id
    findById(id: ValueObject<String>): Promise<Aggregate | null>;

    // get multiple records
    get(query: QueryStatementInput[]): Promise<Aggregate[]>;

    // update record
    update(item: Aggregate): Promise<void>;

    // delete record
    delete(query: QueryStatementInput[]): Promise<void>;
  
    // delete record by id
    deleteById(id: ValueObject<String>): Promise<void>;
}