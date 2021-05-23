
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciMessageDetail } from './message-detail.aggregate';
import { MessageDetailId } from './value-objects';

export abstract class IMessageDetailRepository implements IRepository<CciMessageDetail>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciMessageDetail>>;

    // create a single record
    abstract create(messageDetail: CciMessageDetail): Promise<void>;

    // create a single or multiple records
    abstract insert(messagesDetail: CciMessageDetail[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciMessageDetail | null>;

    // find a single record by id
    abstract findById(id: MessageDetailId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciMessageDetail | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciMessageDetail[]>;

    // update record
    abstract update(messageDetail: CciMessageDetail, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: MessageDetailId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}