import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';
import { AdminLang } from './../../../../graphql';

@Resolver()
export class FindLangByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindLangById')
    async main(@Args('id') id: string): Promise<AdminLang>
    {
        return await this.queryBus.ask(new FindLangByIdQuery(id));
    }
}