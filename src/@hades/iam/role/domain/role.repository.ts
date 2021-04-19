
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IamRole } from './role.aggregate';
import { RoleId } from './value-objects';

export abstract class IRoleRepository implements IRepository<IamRole>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<IamRole>>;

    // create a single record
    abstract create(role: IamRole): Promise<void>;

    // create a single or multiple records
    abstract insert(roles: IamRole[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamRole | null>;

    // find a single record by id
    abstract findById(id: RoleId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamRole | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamRole[]>;

    // update record
    abstract update(role: IamRole, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: RoleId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}