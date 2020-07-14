import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateMessageOverviewInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { InsertMessagesOverviewCommand } from '@hades/bplus-it-sappi/message-overview/application/insert/insert-messages-overview.command';

@Resolver()
export class InsertMessagesOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiInsertMessagesOverview')
    async main(@Args('payload') payload: BplusItSappiCreateMessageOverviewInput[])
    {
        await this.commandBus.dispatch(new InsertMessagesOverviewCommand(payload));
        return true;
    }
}