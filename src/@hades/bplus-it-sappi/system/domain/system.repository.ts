
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { BplusItSappiSystem } from './system.aggregate';
import { SystemId } from './value-objects';

export abstract class ISystemRepository implements IRepository<BplusItSappiSystem>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<BplusItSappiSystem>>;

    // create a single record
    abstract async create(system: BplusItSappiSystem): Promise<void>;

    // create a single or multiple records
    abstract async insert(systems: BplusItSappiSystem[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<BplusItSappiSystem | null>;

    // find a single record by id
    abstract async findById(id: SystemId): Promise<BplusItSappiSystem | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<BplusItSappiSystem[]>;

    // update record
    abstract async update(system: BplusItSappiSystem): Promise<void>;
  
    // delete record
    abstract async deleteById(id: SystemId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}