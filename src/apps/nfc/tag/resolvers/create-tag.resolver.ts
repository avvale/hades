import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcCreateTagInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateTagCommand } from '@hades/nfc/tag/application/create/create-tag.command';
import { FindTagByIdQuery } from '@hades/nfc/tag/application/find/find-tag-by-id.query';

@Resolver()
export class CreateTagResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcCreateTag')
    async main(@Args('payload') payload: NfcCreateTagInput)
    {
        await this.commandBus.dispatch(new CreateTagCommand(
            payload.id,
            payload.code,
            payload.tenantId,
            payload.tenantCode,
            payload.urlBase,
            payload.params,
            payload.offset,
            payload.isSessionRequired,
            
        ));
        
        return await this.queryBus.ask(new FindTagByIdQuery(payload.id));
    }
}