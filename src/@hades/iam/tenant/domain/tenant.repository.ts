
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IamTenant } from './tenant.aggregate';
import { TenantId } from './value-objects';

export abstract class ITenantRepository implements IRepository<IamTenant>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<IamTenant>>;

    // create a single record
    abstract create(tenant: IamTenant): Promise<void>;

    // create a single or multiple records
    abstract insert(tenants: IamTenant[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamTenant | null>;

    // find a single record by id
    abstract findById(id: TenantId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamTenant | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamTenant[]>;

    // update record
    abstract update(tenant: IamTenant, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: TenantId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}