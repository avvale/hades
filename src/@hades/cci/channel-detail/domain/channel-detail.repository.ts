
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciChannelDetail } from './channel-detail.aggregate';
import { ChannelDetailId } from './value-objects';

export abstract class IChannelDetailRepository implements IRepository<CciChannelDetail>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<CciChannelDetail>>;

    // create a single record
    abstract async create(channelDetail: CciChannelDetail): Promise<void>;

    // create a single or multiple records
    abstract async insert(channelsDetail: CciChannelDetail[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<CciChannelDetail | null>;

    // find a single record by id
    abstract async findById(id: ChannelDetailId): Promise<CciChannelDetail | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<CciChannelDetail[]>;

    // update record
    abstract async update(channelDetail: CciChannelDetail): Promise<void>;
  
    // delete record
    abstract async deleteById(id: ChannelDetailId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}