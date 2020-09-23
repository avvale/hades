
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IamRole } from './role.aggregate';
import { RoleId } from './value-objects';

export abstract class IRoleRepository implements IRepository<IamRole>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<IamRole>>;

    // create a single record
    abstract async create(role: IamRole): Promise<void>;

    // create a single or multiple records
    abstract async insert(roles: IamRole[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<IamRole | null>;

    // find a single record by id
    abstract async findById(id: RoleId): Promise<IamRole | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<IamRole[]>;

    // update record
    abstract async update(role: IamRole): Promise<void>;
  
    // delete record
    abstract async deleteById(id: RoleId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}