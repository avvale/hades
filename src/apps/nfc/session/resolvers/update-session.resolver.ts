import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcUpdateSessionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateSessionCommand } from '@hades/nfc/session/application/update/update-session.command';
import { FindSessionByIdQuery } from '@hades/nfc/session/application/find/find-session-by-id.query';

@Resolver()
export class UpdateSessionResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcUpdateSession')
    async main(@Args('payload') payload: NfcUpdateSessionInput)
    {
        await this.commandBus.dispatch(new UpdateSessionCommand(
            payload.id,
            payload.ip,
            payload.tagId,
            payload.uid,
            payload.counter,
            payload.expiredAt,
            
        ));
        
        return await this.queryBus.ask(new FindSessionByIdQuery(payload.id));
    }
}