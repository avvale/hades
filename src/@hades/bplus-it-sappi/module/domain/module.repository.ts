
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { BplusItSappiModule } from './module.aggregate';
import { ModuleId } from './value-objects';

export abstract class IModuleRepository implements IRepository<BplusItSappiModule>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<BplusItSappiModule>>;

    // create a single record
    abstract async create(module: BplusItSappiModule): Promise<void>;

    // create a single or multiple records
    abstract async insert(modules: BplusItSappiModule[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<BplusItSappiModule | null>;

    // find a single record by id
    abstract async findById(id: ModuleId): Promise<BplusItSappiModule | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<BplusItSappiModule[]>;

    // update record
    abstract async update(module: BplusItSappiModule): Promise<void>;
  
    // delete record
    abstract async deleteById(id: ModuleId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}