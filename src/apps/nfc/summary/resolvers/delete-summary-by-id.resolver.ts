import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindSummaryByIdQuery } from '@hades/nfc/summary/application/find/find-summary-by-id.query';
import { DeleteSummaryByIdCommand } from '@hades/nfc/summary/application/delete/delete-summary-by-id.command';

@Resolver()
export class DeleteSummaryByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcDeleteSummaryById')
    async main(@Args('id') id: string)
    {
        const summary = await this.queryBus.ask(new FindSummaryByIdQuery(id));

        await this.commandBus.dispatch(new DeleteSummaryByIdCommand(id));

        return summary;
    }
}