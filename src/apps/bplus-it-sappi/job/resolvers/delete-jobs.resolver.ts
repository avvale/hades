import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetJobsQuery } from '@hades/bplus-it-sappi/job/application/get/get-jobs.query';
import { DeleteJobsCommand } from '@hades/bplus-it-sappi/job/application/delete/delete-jobs.command';

@Resolver()
export class DeleteJobsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteJobs')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const jobs = await this.queryBus.ask(new GetJobsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteJobsCommand(queryStatements));

        return jobs;
    }
}