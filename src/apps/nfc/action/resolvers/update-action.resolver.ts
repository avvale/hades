import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcUpdateActionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateActionCommand } from '@hades/nfc/action/application/update/update-action.command';
import { FindActionByIdQuery } from '@hades/nfc/action/application/find/find-action-by-id.query';

@Resolver()
export class UpdateActionResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcUpdateAction')
    async main(@Args('payload') payload: NfcUpdateActionInput)
    {
        await this.commandBus.dispatch(new UpdateActionCommand(
            payload.id,
            payload.tagId,
            payload.type,
            payload.sectionId,
            payload.data,
            
        ));
        
        return await this.queryBus.ask(new FindActionByIdQuery(payload.id));
    }
}