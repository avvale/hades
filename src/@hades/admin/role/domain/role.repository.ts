
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminRole } from './role.aggregate';
import { RoleId } from './value-objects';

export abstract class IRoleRepository implements IRepository<AdminRole>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<AdminRole>>;

    // create a single record
    abstract async create(role: AdminRole): Promise<void>;

    // create a single or multiple records
    abstract async insert(roles: AdminRole[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<AdminRole | null>;

    // find a single record by id
    abstract async findById(id: RoleId): Promise<AdminRole | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<AdminRole[]>;

    // update record
    abstract async update(role: AdminRole): Promise<void>;
  
    // delete record
    abstract async deleteById(id: RoleId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}