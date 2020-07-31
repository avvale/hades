
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { BplusItSappiFlow } from './flow.aggregate';
import { FlowId } from './value-objects';

export abstract class IFlowRepository implements IRepository<BplusItSappiFlow>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<BplusItSappiFlow>>;

    // create a single record
    abstract async create(flow: BplusItSappiFlow): Promise<void>;

    // create a single or multiple records
    abstract async insert(flows: BplusItSappiFlow[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<BplusItSappiFlow | null>;

    // find a single record by id
    abstract async findById(id: FlowId): Promise<BplusItSappiFlow | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<BplusItSappiFlow[]>;

    // update record
    abstract async update(flow: BplusItSappiFlow): Promise<void>;
  
    // delete record
    abstract async deleteById(id: FlowId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}