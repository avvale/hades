
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
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciChannelOverview>>;

    // create a single record
    abstract create(channelOverview: CciChannelOverview): Promise<void>;

    // create a single or multiple records
    abstract insert(channelsOverview: CciChannelOverview[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciChannelOverview | null>;

    // find a single record by id
    abstract findById(id: ChannelOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciChannelOverview | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciChannelOverview[]>;

    // get multiple records
    abstract getDashboardData(tenantIds: string[], systemIds: string[], cQMetadata?: CQMetadata): Promise<CciChannelOverview[]>;

    // update record
    abstract update(channelOverview: CciChannelOverview, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: ChannelOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}