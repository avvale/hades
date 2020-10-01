import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetMessagesOverviewQuery } from '@hades/cci/message-overview/application/get/get-messages-overview.query';
import { DeleteMessagesOverviewCommand } from '@hades/cci/message-overview/application/delete/delete-messages-overview.command';

@Resolver()
export class DeleteMessagesOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteMessagesOverview')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const messagesOverview = await this.queryBus.ask(new GetMessagesOverviewQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteMessagesOverviewCommand(queryStatement));

        return messagesOverview;
    }
}