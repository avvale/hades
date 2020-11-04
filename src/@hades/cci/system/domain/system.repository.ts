
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciSystem } from './system.aggregate';
import { SystemId } from './value-objects';

export abstract class ISystemRepository implements IRepository<CciSystem>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciSystem>>;

    // create a single record
    abstract async create(system: CciSystem): Promise<void>;

    // create a single or multiple records
    abstract async insert(systems: CciSystem[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciSystem | null>;

    // find a single record by id
    abstract async findById(id: SystemId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciSystem | null>;

    // get multiple records
    abstract async get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciSystem[]>;

    // update record
    abstract async update(system: CciSystem, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract async deleteById(id: SystemId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}