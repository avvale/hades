
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IamPermission } from './permission.aggregate';
import { PermissionId } from './value-objects';

export abstract class IPermissionRepository implements IRepository<IamPermission>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<IamPermission>>;

    // create a single record
    abstract create(permission: IamPermission): Promise<void>;

    // create a single or multiple records
    abstract insert(permissions: IamPermission[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamPermission | null>;

    // find a single record by id
    abstract findById(id: PermissionId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamPermission | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamPermission[]>;

    // update record
    abstract update(permission: IamPermission, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: PermissionId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}