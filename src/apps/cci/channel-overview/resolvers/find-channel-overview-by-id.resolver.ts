import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelOverviewByIdQuery } from '@hades/cci/channel-overview/application/find/find-channel-overview-by-id.query';
import { CciChannelOverview } from './../../../../graphql';

@Resolver()
export class FindChannelOverviewByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindChannelOverviewById')
    async main(@Args('id') id: string): Promise<CciChannelOverview>
    {
        return await this.queryBus.ask(new FindChannelOverviewByIdQuery(id));
    }
}