
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { BplusItSappiRole } from './role.aggregate';
import { RoleId } from './value-objects';

export abstract class IRoleRepository implements IRepository<BplusItSappiRole>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<BplusItSappiRole>>;

    // create a single record
    abstract async create(role: BplusItSappiRole): Promise<void>;

    // create a single or multiple records
    abstract async insert(roles: BplusItSappiRole[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<BplusItSappiRole | null>;

    // find a single record by id
    abstract async findById(id: RoleId): Promise<BplusItSappiRole | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<BplusItSappiRole[]>;

    // update record
    abstract async update(role: BplusItSappiRole): Promise<void>;
  
    // delete record
    abstract async deleteById(id: RoleId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}