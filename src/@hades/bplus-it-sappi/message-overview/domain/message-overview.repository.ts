
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { BplusItSappiMessageOverview } from './message-overview.aggregate';
import { MessageOverviewId } from './value-objects';

export abstract class IMessageOverviewRepository implements IRepository<BplusItSappiMessageOverview>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<BplusItSappiMessageOverview>>;

    // create a single record
    abstract async create(messageOverview: BplusItSappiMessageOverview): Promise<void>;

    // create a single or multiple records
    abstract async insert(messagesOverview: BplusItSappiMessageOverview[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<BplusItSappiMessageOverview | null>;

    // find a single record by id
    abstract async findById(id: MessageOverviewId): Promise<BplusItSappiMessageOverview | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<BplusItSappiMessageOverview[]>;

    // update record
    abstract async update(messageOverview: BplusItSappiMessageOverview): Promise<void>;
  
    // delete record
    abstract async deleteById(id: MessageOverviewId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}