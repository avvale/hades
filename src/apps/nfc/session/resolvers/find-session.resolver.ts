import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindSessionQuery } from '@hades/nfc/session/application/find/find-session.query';
import { NfcSession } from './../../../../graphql';

@Resolver()
export class FindSessionResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcFindSession')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<NfcSession>
    {
        return await this.queryBus.ask(new FindSessionQuery(queryStatements));
    }
}