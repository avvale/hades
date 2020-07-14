import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindBoundedContextByIdQuery } from '@hades/admin/bounded-context/application/find/find-bounded-context-by-id.query';
import { AdminBoundedContext } from './../../../../graphql';

@Resolver()
export class FindBoundedContextByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindBoundedContextById')
    async main(@Args('id') id: string): Promise<AdminBoundedContext>
    {
        return await this.queryBus.ask(new FindBoundedContextByIdQuery(id));
    }
}