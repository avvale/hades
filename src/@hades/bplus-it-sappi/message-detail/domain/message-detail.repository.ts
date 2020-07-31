
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { BplusItSappiMessageDetail } from './message-detail.aggregate';
import { MessageDetailId } from './value-objects';

export abstract class IMessageDetailRepository implements IRepository<BplusItSappiMessageDetail>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<BplusItSappiMessageDetail>>;

    // create a single record
    abstract async create(messageDetail: BplusItSappiMessageDetail): Promise<void>;

    // create a single or multiple records
    abstract async insert(messagesDetail: BplusItSappiMessageDetail[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<BplusItSappiMessageDetail | null>;

    // find a single record by id
    abstract async findById(id: MessageDetailId): Promise<BplusItSappiMessageDetail | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<BplusItSappiMessageDetail[]>;

    // update record
    abstract async update(messageDetail: BplusItSappiMessageDetail): Promise<void>;
  
    // delete record
    abstract async deleteById(id: MessageDetailId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}