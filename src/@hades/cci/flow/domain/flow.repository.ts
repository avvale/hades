
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciFlow } from './flow.aggregate';
import { FlowId } from './value-objects';

export abstract class IFlowRepository implements IRepository<CciFlow>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<CciFlow>>;

    // create a single record
    abstract async create(flow: CciFlow): Promise<void>;

    // create a single or multiple records
    abstract async insert(flows: CciFlow[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<CciFlow | null>;

    // find a single record by id
    abstract async findById(id: FlowId): Promise<CciFlow | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<CciFlow[]>;

    // update record
    abstract async update(flow: CciFlow): Promise<void>;
  
    // delete record
    abstract async deleteById(id: FlowId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}