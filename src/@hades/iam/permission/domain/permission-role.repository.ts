
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IamPermissionRole } from './permission-role.aggregate';
import { PermissionId } from './value-objects';

export abstract class IPermissionRoleRepository implements IRepository<IamPermissionRole>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<IamPermissionRole>>;

    // create a single record
    abstract create(permission: IamPermissionRole): Promise<void>;

    // create a single or multiple records
    abstract insert(permissions: IamPermissionRole[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement): Promise<IamPermissionRole | null>;

    // find a single record by id
    abstract findById(id: PermissionId): Promise<IamPermissionRole | null>;

    // get multiple records
    abstract get(query: QueryStatement): Promise<IamPermissionRole[]>;

    // update record
    abstract update(permission: IamPermissionRole): Promise<void>;

    // delete record
    abstract deleteById(id: PermissionId): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement): Promise<void>;
}