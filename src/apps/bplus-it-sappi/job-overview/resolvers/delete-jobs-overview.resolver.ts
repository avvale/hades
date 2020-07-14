import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetJobsOverviewQuery } from '@hades/bplus-it-sappi/job-overview/application/get/get-jobs-overview.query';
import { DeleteJobsOverviewCommand } from '@hades/bplus-it-sappi/job-overview/application/delete/delete-jobs-overview.command';

@Resolver()
export class DeleteJobsOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteJobsOverview')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const jobsOverview = await this.queryBus.ask(new GetJobsOverviewQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteJobsOverviewCommand(queryStatements));

        return jobsOverview;
    }
}