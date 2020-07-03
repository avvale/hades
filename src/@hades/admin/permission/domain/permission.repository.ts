
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminPermission } from './permission.aggregate';
import { PermissionId } from './value-objects';

export abstract class IPermissionRepository implements IRepository<AdminPermission>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<AdminPermission>>;

    // create a single record
    abstract async create(permission: AdminPermission): Promise<void>;

    // create a single or multiple records
    abstract async insert(permissions: AdminPermission[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<AdminPermission | null>;

    // find a single record by id
    abstract async findById(id: PermissionId): Promise<AdminPermission | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<AdminPermission[]>;

    // update record
    abstract async update(permission: AdminPermission): Promise<void>;
  
    // delete record
    abstract async deleteById(id: PermissionId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}