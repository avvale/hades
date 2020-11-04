
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciChannelOverview } from './channel-overview.aggregate';
import { ChannelOverviewId } from './value-objects';

export abstract class IChannelOverviewRepository implements IRepository<CciChannelOverview>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciChannelOverview>>;

    // create a single record
    abstract async create(channelOverview: CciChannelOverview): Promise<void>;

    // create a single or multiple records
    abstract async insert(channelsOverview: CciChannelOverview[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciChannelOverview | null>;

    // find a single record by id
    abstract async findById(id: ChannelOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciChannelOverview | null>;

    // get multiple records
    abstract async get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciChannelOverview[]>;

    // get multiple records
    abstract async getDashboardData(tenantIds: string[], systemIds: string[], cQMetadata?: CQMetadata): Promise<CciChannelOverview[]>;

    // update record
    abstract async update(channelOverview: CciChannelOverview, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract async deleteById(id: ChannelOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}