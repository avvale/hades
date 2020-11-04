
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciJobOverview } from './job-overview.aggregate';
import { JobOverviewId } from './value-objects';

export abstract class IJobOverviewRepository implements IRepository<CciJobOverview>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciJobOverview>>;

    // create a single record
    abstract async create(jobOverview: CciJobOverview): Promise<void>;

    // create a single or multiple records
    abstract async insert(jobsOverview: CciJobOverview[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciJobOverview | null>;

    // find a single record by id
    abstract async findById(id: JobOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciJobOverview | null>;

    // get multiple records
    abstract async get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciJobOverview[]>;

    // get multiple records
    abstract async getDashboardData(tenantIds: string[], systemIds: string[], cQMetadata?: CQMetadata): Promise<CciJobOverview[]>;

    // update record
    abstract async update(jobOverview: CciJobOverview, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract async deleteById(id: JobOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}