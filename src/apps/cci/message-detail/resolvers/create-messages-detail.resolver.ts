import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciCreateMessageDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateMessagesDetailCommand } from '@hades/cci/message-detail/application/create/create-messages-detail.command';

@Resolver()
export class CreateMessagesDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateMessagesDetail')
    async main(@Args('payload') payload: CciCreateMessageDetailInput[])
    {
        await this.commandBus.dispatch(new CreateMessagesDetailCommand(payload));
        return true;
    }
}