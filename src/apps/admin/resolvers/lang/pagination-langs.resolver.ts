import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { GetLangsQuery } from '@hades/admin/lang/application/get/get-langs.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { AdminLang } from './../../../../graphql';

@Resolver()
export class PaginationLangsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminPaginationLangs')
    async main(@Args('query') queryStatements: QueryStatementInput[], @Args('constraints') constraints: QueryStatementInput[]): Promise<AdminLang[]>
    {
        return await this.queryBus.ask(new GetLangsQuery(queryStatements));
    }
}