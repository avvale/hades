
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
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciJobOverview>>;

    // create a single record
    abstract create(jobOverview: CciJobOverview): Promise<void>;

    // create a single or multiple records
    abstract insert(jobsOverview: CciJobOverview[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciJobOverview | null>;

    // find a single record by id
    abstract findById(id: JobOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciJobOverview | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciJobOverview[]>;

    // get multiple records
    abstract getDashboardData(tenantIds: string[], systemIds: string[], cQMetadata?: CQMetadata): Promise<CciJobOverview[]>;

    // update record
    abstract update(jobOverview: CciJobOverview, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: JobOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}