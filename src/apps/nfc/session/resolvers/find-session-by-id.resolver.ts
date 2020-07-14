import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindSessionByIdQuery } from '@hades/nfc/session/application/find/find-session-by-id.query';
import { NfcSession } from './../../../../graphql';

@Resolver()
export class FindSessionByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcFindSessionById')
    async main(@Args('id') id: string): Promise<NfcSession>
    {
        return await this.queryBus.ask(new FindSessionByIdQuery(id));
    }
}