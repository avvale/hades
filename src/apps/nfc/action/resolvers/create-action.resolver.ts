import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcCreateActionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateActionCommand } from '@hades/nfc/action/application/create/create-action.command';
import { FindActionByIdQuery } from '@hades/nfc/action/application/find/find-action-by-id.query';

@Resolver()
export class CreateActionResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcCreateAction')
    async main(@Args('payload') payload: NfcCreateActionInput)
    {
        await this.commandBus.dispatch(new CreateActionCommand(
            payload.id,
            payload.tagId,
            payload.type,
            payload.sectionId,
            payload.data,
            
        ));
        
        return await this.queryBus.ask(new FindActionByIdQuery(payload.id));
    }
}