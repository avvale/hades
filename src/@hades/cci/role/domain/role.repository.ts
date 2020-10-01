
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciRole } from './role.aggregate';
import { RoleId } from './value-objects';

export abstract class IRoleRepository implements IRepository<CciRole>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<CciRole>>;

    // create a single record
    abstract async create(role: CciRole): Promise<void>;

    // create a single or multiple records
    abstract async insert(roles: CciRole[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<CciRole | null>;

    // find a single record by id
    abstract async findById(id: RoleId): Promise<CciRole | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<CciRole[]>;

    // update record
    abstract async update(role: CciRole): Promise<void>;
  
    // delete record
    abstract async deleteById(id: RoleId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}