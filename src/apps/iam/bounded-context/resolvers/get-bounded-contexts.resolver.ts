import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetBoundedContextsQuery } from '@hades/iam/bounded-context/application/get/get-bounded-contexts.query';
import { IamBoundedContext } from './../../../../graphql';

@Resolver()
export class GetBoundedContextsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamGetBoundedContexts')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<IamBoundedContext[]>
    {
        return await this.queryBus.ask(new GetBoundedContextsQuery(queryStatement));
    }
}