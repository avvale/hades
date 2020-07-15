import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetMessagesDetailQuery } from '@hades/bplus-it-sappi/message-detail/application/get/get-messages-detail.query';
import { DeleteMessagesDetailCommand } from '@hades/bplus-it-sappi/message-detail/application/delete/delete-messages-detail.command';

@Resolver()
export class DeleteMessagesDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteMessagesDetail')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const messagesDetail = await this.queryBus.ask(new GetMessagesDetailQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteMessagesDetailCommand(queryStatements));

        return messagesDetail;
    }
}