import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetMessagesDetailQuery } from '@hades/cci/message-detail/application/get/get-messages-detail.query';
import { DeleteMessagesDetailCommand } from '@hades/cci/message-detail/application/delete/delete-messages-detail.command';

@Resolver()
export class DeleteMessagesDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteMessagesDetail')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const messagesDetail = await this.queryBus.ask(new GetMessagesDetailQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteMessagesDetailCommand(queryStatement));

        return messagesDetail;
    }
}