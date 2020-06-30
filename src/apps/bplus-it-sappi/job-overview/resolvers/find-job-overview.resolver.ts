import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindJobOverviewQuery } from '@hades/bplus-it-sappi/job-overview/application/find/find-job-overview.query';
import { BplusItSappiJobOverview } from './../../../../graphql';

@Resolver()
export class FindJobOverviewResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindJobOverview')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiJobOverview>
    {
        return await this.queryBus.ask(new FindJobOverviewQuery(queryStatements));
    }
}