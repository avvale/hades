import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetTagsQuery } from '@hades/nfc/tag/application/get/get-tags.query';
import { NfcTag } from './../../../../graphql';

@Resolver()
export class GetTagsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcGetTags')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<NfcTag[]>
    {
        return await this.queryBus.ask(new GetTagsQuery(queryStatements));
    }
}