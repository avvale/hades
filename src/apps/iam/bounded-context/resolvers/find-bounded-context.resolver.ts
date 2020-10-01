import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindBoundedContextQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context.query';
import { IamBoundedContext } from './../../../../graphql';

@Resolver()
export class FindBoundedContextResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindBoundedContext')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<IamBoundedContext>
    {
        return await this.queryBus.ask(new FindBoundedContextQuery(queryStatement));
    }
}