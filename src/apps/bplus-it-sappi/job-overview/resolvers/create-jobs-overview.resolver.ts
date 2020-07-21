import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateJobOverviewInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateJobsOverviewCommand } from '@hades/bplus-it-sappi/job-overview/application/create/create-jobs-overview.command';

@Resolver()
export class CreateJobsOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateJobsOverview')
    async main(@Args('payload') payload: BplusItSappiCreateJobOverviewInput[])
    {
        await this.commandBus.dispatch(new CreateJobsOverviewCommand(payload));
        return true;
    }
}