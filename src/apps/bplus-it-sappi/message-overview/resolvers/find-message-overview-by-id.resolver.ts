import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindMessageOverviewByIdQuery } from '@hades/bplus-it-sappi/message-overview/application/find/find-message-overview-by-id.query';
import { BplusItSappiMessageOverview } from './../../../../graphql';

@Resolver()
export class FindMessageOverviewByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindMessageOverviewById')
    async main(@Args('id') id: string): Promise<BplusItSappiMessageOverview>
    {
        return await this.queryBus.ask(new FindMessageOverviewByIdQuery(id));
    }
}