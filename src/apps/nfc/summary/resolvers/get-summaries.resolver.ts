import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetSummariesQuery } from '@hades/nfc/summary/application/get/get-summaries.query';
import { NfcSummary } from './../../../../graphql';

@Resolver()
export class GetSummariesResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcGetSummaries')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<NfcSummary[]>
    {
        return await this.queryBus.ask(new GetSummariesQuery(queryStatements));
    }
}