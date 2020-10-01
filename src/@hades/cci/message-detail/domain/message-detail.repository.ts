
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciMessageDetail } from './message-detail.aggregate';
import { MessageDetailId } from './value-objects';

export abstract class IMessageDetailRepository implements IRepository<CciMessageDetail>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<CciMessageDetail>>;

    // create a single record
    abstract async create(messageDetail: CciMessageDetail): Promise<void>;

    // create a single or multiple records
    abstract async insert(messagesDetail: CciMessageDetail[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<CciMessageDetail | null>;

    // find a single record by id
    abstract async findById(id: MessageDetailId): Promise<CciMessageDetail | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<CciMessageDetail[]>;

    // update record
    abstract async update(messageDetail: CciMessageDetail): Promise<void>;
  
    // delete record
    abstract async deleteById(id: MessageDetailId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}