
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminModule } from './module.entity';
import { ModuleId } from './value-objects';

export abstract class IModuleRepository implements IRepository<AdminModule>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<AdminModule>>;

    // create a single record
    abstract async create(module: AdminModule): Promise<void>;

    // create a single or multiple records
    abstract async insert(modules: AdminModule[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<AdminModule | null>;

    // find a single record by id
    abstract async findById(id: ModuleId): Promise<AdminModule | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<AdminModule[]>;

    // update record
    abstract async update(module: AdminModule): Promise<void>;
  
    // delete record
    abstract async deleteById(id: ModuleId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}