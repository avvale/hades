
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
    abstract async paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<IamTenant>>;

    // create a single record
    abstract async create(tenant: IamTenant): Promise<void>;

    // create a single or multiple records
    abstract async insert(tenants: IamTenant[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamTenant | null>;

    // find a single record by id
    abstract async findById(id: TenantId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamTenant | null>;

    // get multiple records
    abstract async get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamTenant[]>;

    // update record
    abstract async update(tenant: IamTenant, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract async deleteById(id: TenantId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}