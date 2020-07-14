import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelOverviewByIdQuery } from '@hades/bplus-it-sappi/channel-overview/application/find/find-channel-overview-by-id.query';
import { BplusItSappiChannelOverview } from './../../../../graphql';

@Resolver()
export class FindChannelOverviewByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindChannelOverviewById')
    async main(@Args('id') id: string): Promise<BplusItSappiChannelOverview>
    {
        return await this.queryBus.ask(new FindChannelOverviewByIdQuery(id));
    }
}