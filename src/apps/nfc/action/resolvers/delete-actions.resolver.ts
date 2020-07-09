import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetActionsQuery } from '@hades/nfc/action/application/get/get-actions.query';
import { DeleteActionsCommand } from '@hades/nfc/action/application/delete/delete-actions.command';

@Resolver()
export class DeleteActionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcDeleteActions')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const actions = await this.queryBus.ask(new GetActionsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteActionsCommand(queryStatements));

        return actions;
    }
}