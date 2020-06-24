
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminTenant } from './tenant.entity';
import { TenantId } from './value-objects';

export abstract class ITenantRepository implements IRepository<AdminTenant>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<AdminTenant>>;

    // create a single record
    abstract async create(tenant: AdminTenant): Promise<void>;

    // create a single or multiple records
    abstract async insert(tenants: AdminTenant[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<AdminTenant | null>;

    // find a single record by id
    abstract async findById(id: TenantId): Promise<AdminTenant | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<AdminTenant[]>;

    // update record
    abstract async update(tenant: AdminTenant): Promise<void>;
  
    // delete record
    abstract async deleteById(id: TenantId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}