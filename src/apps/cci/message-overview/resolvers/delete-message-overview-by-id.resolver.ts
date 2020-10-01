import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindMessageOverviewByIdQuery } from '@hades/cci/message-overview/application/find/find-message-overview-by-id.query';
import { DeleteMessageOverviewByIdCommand } from '@hades/cci/message-overview/application/delete/delete-message-overview-by-id.command';

@Resolver()
export class DeleteMessageOverviewByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteMessageOverviewById')
    async main(@Args('id') id: string)
    {
        const messageOverview = await this.queryBus.ask(new FindMessageOverviewByIdQuery(id));

        await this.commandBus.dispatch(new DeleteMessageOverviewByIdCommand(id));

        return messageOverview;
    }
}