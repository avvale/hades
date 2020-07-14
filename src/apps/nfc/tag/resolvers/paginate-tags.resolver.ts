import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateTagsQuery } from '@hades/nfc/tag/application/paginate/paginate-tags.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateTagsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcPaginateTags')
    async main(@Args('query') queryStatements: QueryStatementInput[], @Args('constraint') constraint: QueryStatementInput[]): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateTagsQuery(queryStatements, constraint));   
    }
}