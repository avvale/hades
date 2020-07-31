
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { BplusItSappiExecution } from './execution.aggregate';
import { ExecutionId } from './value-objects';

export abstract class IExecutionRepository implements IRepository<BplusItSappiExecution>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<BplusItSappiExecution>>;

    // create a single record
    abstract async create(execution: BplusItSappiExecution): Promise<void>;

    // create a single or multiple records
    abstract async insert(executions: BplusItSappiExecution[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<BplusItSappiExecution | null>;

    // find a single record by id
    abstract async findById(id: ExecutionId): Promise<BplusItSappiExecution | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<BplusItSappiExecution[]>;

    // update record
    abstract async update(execution: BplusItSappiExecution): Promise<void>;
  
    // delete record
    abstract async deleteById(id: ExecutionId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}