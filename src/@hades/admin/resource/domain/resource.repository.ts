
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
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<AdminResource>>;

    // create a single record
    abstract create(resource: AdminResource): Promise<void>;

    // create a single or multiple records
    abstract insert(resources: AdminResource[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminResource | null>;

    // find a single record by id
    abstract findById(id: ResourceId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminResource | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminResource[]>;

    // update record
    abstract update(resource: AdminResource, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: ResourceId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}