
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciChannelOverview } from './channel-overview.aggregate';
import { ChannelOverviewId } from './value-objects';

export abstract class IChannelOverviewRepository implements IRepository<CciChannelOverview>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<CciChannelOverview>>;

    // create a single record
    abstract async create(channelOverview: CciChannelOverview): Promise<void>;

    // create a single or multiple records
    abstract async insert(channelsOverview: CciChannelOverview[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<CciChannelOverview | null>;

    // find a single record by id
    abstract async findById(id: ChannelOverviewId): Promise<CciChannelOverview | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<CciChannelOverview[]>;

    // get multiple records
    abstract async getDashboardData(query: QueryStatement): Promise<CciChannelOverview[]>;

    // update record
    abstract async update(channelOverview: CciChannelOverview): Promise<void>;
  
    // delete record
    abstract async deleteById(id: ChannelOverviewId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}