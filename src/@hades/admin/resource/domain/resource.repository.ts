
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminResource } from './resource.aggregate';
import { ResourceId } from './value-objects';

export abstract class IResourceRepository implements IRepository<AdminResource>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<AdminResource>>;

    // create a single record
    abstract async create(resource: AdminResource): Promise<void>;

    // create a single or multiple records
    abstract async insert(resources: AdminResource[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<AdminResource | null>;

    // find a single record by id
    abstract async findById(id: ResourceId): Promise<AdminResource | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<AdminResource[]>;

    // update record
    abstract async update(resource: AdminResource): Promise<void>;
  
    // delete record
    abstract async deleteById(id: ResourceId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}