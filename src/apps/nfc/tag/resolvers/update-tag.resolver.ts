import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcUpdateTagInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateTagCommand } from '@hades/nfc/tag/application/update/update-tag.command';
import { FindTagByIdQuery } from '@hades/nfc/tag/application/find/find-tag-by-id.query';

@Resolver()
export class UpdateTagResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcUpdateTag')
    async main(@Args('payload') payload: NfcUpdateTagInput)
    {
        await this.commandBus.dispatch(new UpdateTagCommand(
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