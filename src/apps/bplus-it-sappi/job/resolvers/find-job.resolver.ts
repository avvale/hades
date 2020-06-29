import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindJobQuery } from '@hades/bplus-it-sappi/job/application/find/find-job.query';
import { BplusItSappiJob } from './../../../../graphql';

@Resolver()
export class FindJobResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindJob')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiJob>
    {
        return await this.queryBus.ask(new FindJobQuery(queryStatements));
    }
}