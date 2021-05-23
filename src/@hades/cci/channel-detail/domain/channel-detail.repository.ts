
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciChannelDetail } from './channel-detail.aggregate';
import { ChannelDetailId } from './value-objects';

export abstract class IChannelDetailRepository implements IRepository<CciChannelDetail>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciChannelDetail>>;

    // create a single record
    abstract create(channelDetail: CciChannelDetail): Promise<void>;

    // create a single or multiple records
    abstract insert(channelsDetail: CciChannelDetail[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciChannelDetail | null>;

    // find a single record by id
    abstract findById(id: ChannelDetailId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciChannelDetail | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciChannelDetail[]>;

    // update record
    abstract update(channelDetail: CciChannelDetail, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: ChannelDetailId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}