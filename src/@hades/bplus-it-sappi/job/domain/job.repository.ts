
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { BplusItSappiJob } from './job.entity';
import { JobId } from './value-objects';

export abstract class IJobRepository implements IRepository<BplusItSappiJob>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<BplusItSappiJob>>;

    // create a single record
    abstract async create(job: BplusItSappiJob): Promise<void>;

    // create a single or multiple records
    abstract async insert(jobs: BplusItSappiJob[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<BplusItSappiJob | null>;

    // find a single record by id
    abstract async findById(id: JobId): Promise<BplusItSappiJob | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<BplusItSappiJob[]>;

    // update record
    abstract async update(job: BplusItSappiJob): Promise<void>;
  
    // delete record
    abstract async deleteById(id: JobId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}