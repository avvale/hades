
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { BplusItSappiJobDetail } from './job-detail.aggregate';
import { JobDetailId } from './value-objects';

export abstract class IJobDetailRepository implements IRepository<BplusItSappiJobDetail>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<BplusItSappiJobDetail>>;

    // create a single record
    abstract async create(jobDetail: BplusItSappiJobDetail): Promise<void>;

    // create a single or multiple records
    abstract async insert(jobsDetail: BplusItSappiJobDetail[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<BplusItSappiJobDetail | null>;

    // find a single record by id
    abstract async findById(id: JobDetailId): Promise<BplusItSappiJobDetail | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<BplusItSappiJobDetail[]>;

    // update record
    abstract async update(jobDetail: BplusItSappiJobDetail): Promise<void>;
  
    // delete record
    abstract async deleteById(id: JobDetailId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}