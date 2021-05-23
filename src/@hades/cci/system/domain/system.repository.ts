
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
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciSystem>>;

    // create a single record
    abstract create(system: CciSystem): Promise<void>;

    // create a single or multiple records
    abstract insert(systems: CciSystem[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciSystem | null>;

    // find a single record by id
    abstract findById(id: SystemId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciSystem | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciSystem[]>;

    // update record
    abstract update(system: CciSystem, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: SystemId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}