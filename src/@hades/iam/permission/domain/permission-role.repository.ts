
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IamPermissionRole } from './permission-role.aggregate';
import { PermissionId } from './value-objects';

export abstract class IPermissionRoleRepository implements IRepository<IamPermissionRole>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<IamPermissionRole>>;

    // create a single record
    abstract async create(permission: IamPermissionRole): Promise<void>;

    // create a single or multiple records
    abstract async insert(permissions: IamPermissionRole[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<IamPermissionRole | null>;

    // find a single record by id
    abstract async findById(id: PermissionId): Promise<IamPermissionRole | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<IamPermissionRole[]>;

    // update record
    abstract async update(permission: IamPermissionRole): Promise<void>;
  
    // delete record
    abstract async deleteById(id: PermissionId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}