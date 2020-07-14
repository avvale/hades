import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcCreateSessionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { InsertSessionsCommand } from '@hades/nfc/session/application/insert/insert-sessions.command';

@Resolver()
export class InsertSessionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcInsertSessions')
    async main(@Args('payload') payload: NfcCreateSessionInput[])
    {
        await this.commandBus.dispatch(new InsertSessionsCommand(payload));
        return true;
    }
}