import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateMessageDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateMessagesDetailCommand } from '@hades/bplus-it-sappi/message-detail/application/create/create-messages-detail.command';

@Resolver()
export class CreateMessagesDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateMessagesDetail')
    async main(@Args('payload') payload: BplusItSappiCreateMessageDetailInput[])
    {
        await this.commandBus.dispatch(new CreateMessagesDetailCommand(payload));
        return true;
    }
}