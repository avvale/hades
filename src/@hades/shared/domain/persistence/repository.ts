import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { ValueObject } from '@hades/shared/domain/value-objects/value-object';
import { Pagination } from '@hades/shared/domain/lib/pagination';

export interface IRepository<Aggregate>
{
    repository: any;

    // paginate records
    paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<Aggregate>>;

    // create a single record
    create(item: Aggregate): Promise<void>;

    // create a single or multiple records
    insert(items: Aggregate[], options: object): Promise<void>;

    // find a single record
    find(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Aggregate | null>;

    // find a single record by id
    findById(id: ValueObject<String>, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Aggregate | null>;

    // get multiple records
    get(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Aggregate[]>;

    // update record
    update(item: Aggregate, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record by id
    deleteById(id: ValueObject<String>, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    delete(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}