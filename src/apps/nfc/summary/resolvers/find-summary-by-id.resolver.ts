import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindSummaryByIdQuery } from '@hades/nfc/summary/application/find/find-summary-by-id.query';
import { NfcSummary } from './../../../../graphql';

@Resolver()
export class FindSummaryByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcFindSummaryById')
    async main(@Args('id') id: string): Promise<NfcSummary>
    {
        return await this.queryBus.ask(new FindSummaryByIdQuery(id));
    }
}