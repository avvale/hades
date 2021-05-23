
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciJobDetail } from './job-detail.aggregate';
import { JobDetailId } from './value-objects';

export abstract class IJobDetailRepository implements IRepository<CciJobDetail>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciJobDetail>>;

    // create a single record
    abstract create(jobDetail: CciJobDetail): Promise<void>;

    // create a single or multiple records
    abstract insert(jobsDetail: CciJobDetail[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciJobDetail | null>;

    // find a single record by id
    abstract findById(id: JobDetailId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciJobDetail | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciJobDetail[]>;

    // update record
    abstract update(jobDetail: CciJobDetail, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: JobDetailId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}