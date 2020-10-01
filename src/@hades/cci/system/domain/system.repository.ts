
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciSystem } from './system.aggregate';
import { SystemId } from './value-objects';

export abstract class ISystemRepository implements IRepository<CciSystem>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<CciSystem>>;

    // create a single record
    abstract async create(system: CciSystem): Promise<void>;

    // create a single or multiple records
    abstract async insert(systems: CciSystem[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<CciSystem | null>;

    // find a single record by id
    abstract async findById(id: SystemId): Promise<CciSystem | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<CciSystem[]>;

    // update record
    abstract async update(system: CciSystem): Promise<void>;
  
    // delete record
    abstract async deleteById(id: SystemId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}