import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindSummaryQuery } from '@hades/nfc/summary/application/find/find-summary.query';
import { NfcSummary } from './../../../../graphql';

@Resolver()
export class FindSummaryResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcFindSummary')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<NfcSummary>
    {
        return await this.queryBus.ask(new FindSummaryQuery(queryStatements));
    }
}