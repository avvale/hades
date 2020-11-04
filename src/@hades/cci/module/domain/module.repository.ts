
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciModule } from './module.aggregate';
import { ModuleId } from './value-objects';

export abstract class IModuleRepository implements IRepository<CciModule>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciModule>>;

    // create a single record
    abstract async create(module: CciModule): Promise<void>;

    // create a single or multiple records
    abstract async insert(modules: CciModule[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciModule | null>;

    // find a single record by id
    abstract async findById(id: ModuleId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciModule | null>;

    // get multiple records
    abstract async get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciModule[]>;

    // update record
    abstract async update(module: CciModule, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract async deleteById(id: ModuleId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}