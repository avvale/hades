import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcCreateSessionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateSessionsCommand } from '@hades/nfc/session/application/create/create-sessions.command';

@Resolver()
export class CreateSessionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcCreateSessions')
    async main(@Args('payload') payload: NfcCreateSessionInput[])
    {
        await this.commandBus.dispatch(new CreateSessionsCommand(payload));
        return true;
    }
}