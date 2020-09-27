import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetLangsQuery } from '@hades/admin/lang/application/get/get-langs.query';
import { AdminLang } from './../../../../graphql';

@Resolver()
export class GetLangsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminGetLangs')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<AdminLang[]>
    {
        return await this.queryBus.ask(new GetLangsQuery(queryStatement));
    }
}