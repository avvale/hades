import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetJobsDetailQuery } from '@hades/bplus-it-sappi/job-detail/application/get/get-jobs-detail.query';
import { DeleteJobsDetailCommand } from '@hades/bplus-it-sappi/job-detail/application/delete/delete-jobs-detail.command';

@Resolver()
export class DeleteJobsDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteJobsDetail')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const jobsDetail = await this.queryBus.ask(new GetJobsDetailQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteJobsDetailCommand(queryStatements));

        return jobsDetail;
    }
}