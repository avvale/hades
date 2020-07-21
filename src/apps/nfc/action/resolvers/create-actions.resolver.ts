import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcCreateActionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateActionsCommand } from '@hades/nfc/action/application/create/create-actions.command';

@Resolver()
export class CreateActionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcCreateActions')
    async main(@Args('payload') payload: NfcCreateActionInput[])
    {
        await this.commandBus.dispatch(new CreateActionsCommand(payload));
        return true;
    }
}