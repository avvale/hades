import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetSummariesQuery } from '@hades/nfc/summary/application/get/get-summaries.query';
import { DeleteSummariesCommand } from '@hades/nfc/summary/application/delete/delete-summaries.command';

@Resolver()
export class DeleteSummariesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcDeleteSummaries')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const summaries = await this.queryBus.ask(new GetSummariesQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteSummariesCommand(queryStatements));

        return summaries;
    }
}