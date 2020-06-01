import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { GetLangsQuery } from '@hades/admin/lang/application/get/get-langs.query';
import { AdminLang, QueryStatementInput } from './../../../../graphql';

@Resolver()
export class GetLangsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminGetLangs')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<AdminLang[]>
    {
        return await this.queryBus.ask(new GetLangsQuery(queryStatements));
    }
}