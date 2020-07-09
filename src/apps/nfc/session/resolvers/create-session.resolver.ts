import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcCreateSessionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { CreateSessionCommand } from '@hades/nfc/session/application/create/create-session.command';
import { FindSessionByIdQuery } from '@hades/nfc/session/application/find/find-session-by-id.query';

@Resolver()
export class CreateSessionResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcCreateSession')
    async main(@Args('payload') payload: NfcCreateSessionInput)
    {
        await this.commandBus.dispatch(new CreateSessionCommand(
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