
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IamRoleAccount } from './role-account.aggregate';
import { RoleId } from './value-objects';

export abstract class IRoleAccountRepository implements IRepository<IamRoleAccount>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<IamRoleAccount>>;

    // create a single record
    abstract async create(permission: IamRoleAccount): Promise<void>;

    // create a single or multiple records
    abstract async insert(permissions: IamRoleAccount[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<IamRoleAccount | null>;

    // find a single record by id
    abstract async findById(id: RoleId): Promise<IamRoleAccount | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<IamRoleAccount[]>;

    // update record
    abstract async update(permission: IamRoleAccount): Promise<void>;
  
    // delete record
    abstract async deleteById(id: RoleId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}