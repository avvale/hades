import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindTagQuery } from '@hades/nfc/tag/application/find/find-tag.query';
import { NfcTag } from './../../../../graphql';

@Resolver()
export class FindTagResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcFindTag')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<NfcTag>
    {
        return await this.queryBus.ask(new FindTagQuery(queryStatements));
    }
}