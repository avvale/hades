import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindJobDetailQuery } from '@hades/cci/job-detail/application/find/find-job-detail.query';
import { CciJobDetail } from './../../../../graphql';

@Resolver()
export class FindJobDetailResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindJobDetail')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciJobDetail>
    {
        return await this.queryBus.ask(new FindJobDetailQuery(queryStatement));
    }
}