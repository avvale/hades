
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminBoundedContext } from './bounded-context.aggregate';
import { BoundedContextId } from './value-objects';

export abstract class IBoundedContextRepository implements IRepository<AdminBoundedContext>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<AdminBoundedContext>>;

    // create a single record
    abstract async create(boundedContext: AdminBoundedContext): Promise<void>;

    // create a single or multiple records
    abstract async insert(boundedContexts: AdminBoundedContext[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<AdminBoundedContext | null>;

    // find a single record by id
    abstract async findById(id: BoundedContextId): Promise<AdminBoundedContext | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<AdminBoundedContext[]>;

    // update record
    abstract async update(boundedContext: AdminBoundedContext): Promise<void>;
  
    // delete record
    abstract async deleteById(id: BoundedContextId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}