
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IamTenant } from './tenant.aggregate';
import { TenantId } from './value-objects';

export abstract class ITenantRepository implements IRepository<IamTenant>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<IamTenant>>;

    // create a single record
    abstract async create(tenant: IamTenant): Promise<void>;

    // create a single or multiple records
    abstract async insert(tenants: IamTenant[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<IamTenant | null>;

    // find a single record by id
    abstract async findById(id: TenantId): Promise<IamTenant | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<IamTenant[]>;

    // update record
    abstract async update(tenant: IamTenant): Promise<void>;

    // delete record
    abstract async deleteById(id: TenantId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}