
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciExecution } from './execution.aggregate';
import { ExecutionId } from './value-objects';

export abstract class IExecutionRepository implements IRepository<CciExecution>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciExecution>>;

    // create a single record
    abstract create(execution: CciExecution): Promise<void>;

    // create a single or multiple records
    abstract insert(executions: CciExecution[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciExecution | null>;

    // find a single record by id
    abstract findById(id: ExecutionId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciExecution | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciExecution[]>;

    // update record
    abstract update(execution: CciExecution, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: ExecutionId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}