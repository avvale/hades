import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetJobsOverviewQuery } from '@hades/cci/job-overview/application/get/get-jobs-overview.query';
import { DeleteJobsOverviewCommand } from '@hades/cci/job-overview/application/delete/delete-jobs-overview.command';

@Resolver()
export class DeleteJobsOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteJobsOverview')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const jobsOverview = await this.queryBus.ask(new GetJobsOverviewQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteJobsOverviewCommand(queryStatement));

        return jobsOverview;
    }
}