import { QueryStatement } from './sql-statement/sql-statement';
import { ValueObject } from './../value-objects/value-object';
import { Pagination } from './../lib/pagination';

export interface IRepository<Aggregate>
{
    repository: any;
    
    // paginate records
    paginate(query: QueryStatement, constraint?: QueryStatement): Promise<Pagination<Aggregate>>;

    // create a single record
    create(item: Aggregate): Promise<void>;

    // create a single or multiple records
    insert(items: Aggregate[], options: object): Promise<void>;

    // find a single record
    find(query?: QueryStatement, constraint?: QueryStatement): Promise<Aggregate | null>;

    // find a single record by id
    findById(id: ValueObject<String>, constraint?: QueryStatement): Promise<Aggregate | null>;

    // get multiple records
    get(query?: QueryStatement, constraint?: QueryStatement): Promise<Aggregate[]>;

    // update record
    update(item: Aggregate, constraint?: QueryStatement): Promise<void>;

    // delete record
    delete(query?: QueryStatement, constraint?: QueryStatement): Promise<void>;
  
    // delete record by id
    deleteById(id: ValueObject<String>, constraint?: QueryStatement): Promise<void>;
}