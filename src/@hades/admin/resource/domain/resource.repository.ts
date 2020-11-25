
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminResource } from './resource.aggregate';
import { ResourceId } from './value-objects';

export abstract class IResourceRepository implements IRepository<AdminResource>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<AdminResource>>;

    // create a single record
    abstract async create(resource: AdminResource): Promise<void>;

    // create a single or multiple records
    abstract async insert(resources: AdminResource[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminResource | null>;

    // find a single record by id
    abstract async findById(id: ResourceId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminResource | null>;

    // get multiple records
    abstract async get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminResource[]>;

    // update record
    abstract async update(resource: AdminResource, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract async deleteById(id: ResourceId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}