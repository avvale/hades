
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciJobOverview } from './job-overview.aggregate';
import { JobOverviewId } from './value-objects';

export abstract class IJobOverviewRepository implements IRepository<CciJobOverview>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<CciJobOverview>>;

    // create a single record
    abstract async create(jobOverview: CciJobOverview): Promise<void>;

    // create a single or multiple records
    abstract async insert(jobsOverview: CciJobOverview[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<CciJobOverview | null>;

    // find a single record by id
    abstract async findById(id: JobOverviewId): Promise<CciJobOverview | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<CciJobOverview[]>;

    // update record
    abstract async update(jobOverview: CciJobOverview): Promise<void>;
  
    // delete record
    abstract async deleteById(id: JobOverviewId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}