import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcCreateActionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { InsertActionsCommand } from '@hades/nfc/action/application/insert/insert-actions.command';

@Resolver()
export class InsertActionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcInsertActions')
    async main(@Args('payload') payload: NfcCreateActionInput[])
    {
        await this.commandBus.dispatch(new InsertActionsCommand(payload));
        return true;
    }
}