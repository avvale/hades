import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetSessionsQuery } from '@hades/nfc/session/application/get/get-sessions.query';
import { DeleteSessionsCommand } from '@hades/nfc/session/application/delete/delete-sessions.command';

@Resolver()
export class DeleteSessionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcDeleteSessions')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const sessions = await this.queryBus.ask(new GetSessionsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteSessionsCommand(queryStatements));

        return sessions;
    }
}