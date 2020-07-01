import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetMessagesOverviewQuery } from '@hades/bplus-it-sappi/message-overview/application/get/get-messages-overview.query';
import { BplusItSappiMessageOverview } from './../../../../graphql';

@Resolver()
export class GetMessagesOverviewResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiGetMessagesOverview')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiMessageOverview[]>
    {
        return await this.queryBus.ask(new GetMessagesOverviewQuery(queryStatements));
    }
}