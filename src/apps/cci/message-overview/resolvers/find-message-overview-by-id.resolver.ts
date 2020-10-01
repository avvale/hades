import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindMessageOverviewByIdQuery } from '@hades/cci/message-overview/application/find/find-message-overview-by-id.query';
import { CciMessageOverview } from './../../../../graphql';

@Resolver()
export class FindMessageOverviewByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindMessageOverviewById')
    async main(@Args('id') id: string): Promise<CciMessageOverview>
    {
        return await this.queryBus.ask(new FindMessageOverviewByIdQuery(id));
    }
}