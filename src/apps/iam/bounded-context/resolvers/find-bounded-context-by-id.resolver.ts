import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindBoundedContextByIdQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { IamBoundedContext } from './../../../../graphql';

@Resolver()
export class FindBoundedContextByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindBoundedContextById')
    async main(@Args('id') id: string): Promise<IamBoundedContext>
    {
        return await this.queryBus.ask(new FindBoundedContextByIdQuery(id));
    }
}