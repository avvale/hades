import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';
import { AdminLang } from './../../../../graphql';

@Resolver()
export class FindLangIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindLangId')
    async main(@Args('id') id: string): Promise<AdminLang>
    {
        return await this.queryBus.ask(new FindLangByIdQuery(id));
    }
}