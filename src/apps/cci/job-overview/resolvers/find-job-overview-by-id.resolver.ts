import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindJobOverviewByIdQuery } from '@hades/cci/job-overview/application/find/find-job-overview-by-id.query';
import { CciJobOverview } from './../../../../graphql';

@Resolver()
export class FindJobOverviewByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindJobOverviewById')
    async main(@Args('id') id: string): Promise<CciJobOverview>
    {
        return await this.queryBus.ask(new FindJobOverviewByIdQuery(id));
    }
}