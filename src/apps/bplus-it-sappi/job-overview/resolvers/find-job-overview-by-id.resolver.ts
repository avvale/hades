import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindJobOverviewByIdQuery } from '@hades/bplus-it-sappi/job-overview/application/find/find-job-overview-by-id.query';
import { BplusItSappiJobOverview } from './../../../../graphql';

@Resolver()
export class FindJobOverviewByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindJobOverviewById')
    async main(@Args('id') id: string): Promise<BplusItSappiJobOverview>
    {
        return await this.queryBus.ask(new FindJobOverviewByIdQuery(id));
    }
}