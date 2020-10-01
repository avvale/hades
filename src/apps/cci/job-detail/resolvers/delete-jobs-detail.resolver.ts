import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetJobsDetailQuery } from '@hades/cci/job-detail/application/get/get-jobs-detail.query';
import { DeleteJobsDetailCommand } from '@hades/cci/job-detail/application/delete/delete-jobs-detail.command';

@Resolver()
export class DeleteJobsDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteJobsDetail')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const jobsDetail = await this.queryBus.ask(new GetJobsDetailQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteJobsDetailCommand(queryStatement));

        return jobsDetail;
    }
}