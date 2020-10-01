import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetMessagesOverviewQuery } from '@hades/cci/message-overview/application/get/get-messages-overview.query';
import { CciMessageOverview } from './../../../../graphql';

@Resolver()
export class GetMessagesOverviewResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciGetMessagesOverview')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciMessageOverview[]>
    {
        return await this.queryBus.ask(new GetMessagesOverviewQuery(queryStatement));
    }
}