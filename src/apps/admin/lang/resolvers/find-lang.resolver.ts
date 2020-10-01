import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindLangQuery } from '@hades/admin/lang/application/find/find-lang.query';
import { AdminLang } from './../../../../graphql';

@Resolver()
export class FindLangResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindLang')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<AdminLang>
    {
        return await this.queryBus.ask(new FindLangQuery(queryStatement));
    }
}