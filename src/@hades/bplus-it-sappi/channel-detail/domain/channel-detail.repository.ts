
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { BplusItSappiChannelDetail } from './channel-detail.aggregate';
import { ChannelDetailId } from './value-objects';

export abstract class IChannelDetailRepository implements IRepository<BplusItSappiChannelDetail>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<BplusItSappiChannelDetail>>;

    // create a single record
    abstract async create(channelDetail: BplusItSappiChannelDetail): Promise<void>;

    // create a single or multiple records
    abstract async insert(channelsDetail: BplusItSappiChannelDetail[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<BplusItSappiChannelDetail | null>;

    // find a single record by id
    abstract async findById(id: ChannelDetailId): Promise<BplusItSappiChannelDetail | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<BplusItSappiChannelDetail[]>;

    // update record
    abstract async update(channelDetail: BplusItSappiChannelDetail): Promise<void>;
  
    // delete record
    abstract async deleteById(id: ChannelDetailId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}