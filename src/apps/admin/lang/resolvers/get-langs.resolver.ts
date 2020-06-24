import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetLangsQuery } from '@hades/admin/lang/application/get/get-langs.query';
import { AdminLang } from './../../../../graphql';

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