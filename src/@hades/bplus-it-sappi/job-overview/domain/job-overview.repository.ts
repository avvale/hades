
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { BplusItSappiJobOverview } from './job-overview.entity';
import { JobOverviewId } from './value-objects';

export abstract class IJobOverviewRepository implements IRepository<BplusItSappiJobOverview>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<BplusItSappiJobOverview>>;

    // create a single record
    abstract async create(jobOverview: BplusItSappiJobOverview): Promise<void>;

    // create a single or multiple records
    abstract async insert(jobsOverview: BplusItSappiJobOverview[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<BplusItSappiJobOverview | null>;

    // find a single record by id
    abstract async findById(id: JobOverviewId): Promise<BplusItSappiJobOverview | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<BplusItSappiJobOverview[]>;

    // update record
    abstract async update(jobOverview: BplusItSappiJobOverview): Promise<void>;
  
    // delete record
    abstract async deleteById(id: JobOverviewId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}