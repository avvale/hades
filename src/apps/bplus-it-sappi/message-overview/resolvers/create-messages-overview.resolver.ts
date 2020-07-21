import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateMessageOverviewInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateMessagesOverviewCommand } from '@hades/bplus-it-sappi/message-overview/application/create/create-messages-overview.command';

@Resolver()
export class CreateMessagesOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateMessagesOverview')
    async main(@Args('payload') payload: BplusItSappiCreateMessageOverviewInput[])
    {
        await this.commandBus.dispatch(new CreateMessagesOverviewCommand(payload));
        return true;
    }
}