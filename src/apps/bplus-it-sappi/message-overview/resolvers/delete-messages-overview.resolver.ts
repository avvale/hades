import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetMessagesOverviewQuery } from '@hades/bplus-it-sappi/message-overview/application/get/get-messages-overview.query';
import { DeleteMessagesOverviewCommand } from '@hades/bplus-it-sappi/message-overview/application/delete/delete-messages-overview.command';

@Resolver()
export class DeleteMessagesOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteMessagesOverview')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const messagesOverview = await this.queryBus.ask(new GetMessagesOverviewQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteMessagesOverviewCommand(queryStatements));

        return messagesOverview;
    }
}