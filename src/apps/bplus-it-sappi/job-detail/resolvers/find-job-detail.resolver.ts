import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindJobDetailQuery } from '@hades/bplus-it-sappi/job-detail/application/find/find-job-detail.query';
import { BplusItSappiJobDetail } from './../../../../graphql';

@Resolver()
export class FindJobDetailResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindJobDetail')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiJobDetail>
    {
        return await this.queryBus.ask(new FindJobDetailQuery(queryStatements));
    }
}