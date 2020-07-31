
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { BplusItSappiChannelOverview } from './channel-overview.aggregate';
import { ChannelOverviewId } from './value-objects';

export abstract class IChannelOverviewRepository implements IRepository<BplusItSappiChannelOverview>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<BplusItSappiChannelOverview>>;

    // create a single record
    abstract async create(channelOverview: BplusItSappiChannelOverview): Promise<void>;

    // create a single or multiple records
    abstract async insert(channelsOverview: BplusItSappiChannelOverview[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<BplusItSappiChannelOverview | null>;

    // find a single record by id
    abstract async findById(id: ChannelOverviewId): Promise<BplusItSappiChannelOverview | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<BplusItSappiChannelOverview[]>;

    // update record
    abstract async update(channelOverview: BplusItSappiChannelOverview): Promise<void>;
  
    // delete record
    abstract async deleteById(id: ChannelOverviewId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}