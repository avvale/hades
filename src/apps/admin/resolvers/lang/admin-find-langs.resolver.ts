import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '../../../../@hades/shared/domain/bus/query-bus.service';
import { FindLangsQuery } from '../../../../@hades/admin/lang/application/find/find-langs.query';
import { AdminLang, QueryStatementInput } from '../../../../graphql';

@Resolver()
export class AdminFindLangsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindLangs')
    async main(@Args('query') query: QueryStatementInput[]): Promise<AdminLang>
    {
        return await this.queryBus.ask(new FindLangsQuery());
    }
}