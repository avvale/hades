import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateMessageDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { InsertMessagesDetailCommand } from '@hades/bplus-it-sappi/message-detail/application/insert/insert-messages-detail.command';

@Resolver()
export class InsertMessagesDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiInsertMessagesDetail')
    async main(@Args('payload') payload: BplusItSappiCreateMessageDetailInput[])
    {
        await this.commandBus.dispatch(new InsertMessagesDetailCommand(payload));
        return true;
    }
}