
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IamBoundedContext } from './bounded-context.aggregate';
import { BoundedContextId } from './value-objects';

export abstract class IBoundedContextRepository implements IRepository<IamBoundedContext>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<IamBoundedContext>>;

    // create a single record
    abstract async create(boundedContext: IamBoundedContext): Promise<void>;

    // create a single or multiple records
    abstract async insert(boundedContexts: IamBoundedContext[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<IamBoundedContext | null>;

    // find a single record by id
    abstract async findById(id: BoundedContextId): Promise<IamBoundedContext | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<IamBoundedContext[]>;

    // update record
    abstract async update(boundedContext: IamBoundedContext): Promise<void>;
  
    // delete record
    abstract async deleteById(id: BoundedContextId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}