
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IamPermission } from './permission.aggregate';
import { PermissionId } from './value-objects';

export abstract class IPermissionRepository implements IRepository<IamPermission>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<IamPermission>>;

    // create a single record
    abstract async create(permission: IamPermission): Promise<void>;

    // create a single or multiple records
    abstract async insert(permissions: IamPermission[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<IamPermission | null>;

    // find a single record by id
    abstract async findById(id: PermissionId): Promise<IamPermission | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<IamPermission[]>;

    // update record
    abstract async update(permission: IamPermission): Promise<void>;

    // delete record
    abstract async deleteById(id: PermissionId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}