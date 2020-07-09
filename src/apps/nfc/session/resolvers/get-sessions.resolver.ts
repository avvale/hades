import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetSessionsQuery } from '@hades/nfc/session/application/get/get-sessions.query';
import { NfcSession } from './../../../../graphql';

@Resolver()
export class GetSessionsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcGetSessions')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<NfcSession[]>
    {
        return await this.queryBus.ask(new GetSessionsQuery(queryStatements));
    }
}