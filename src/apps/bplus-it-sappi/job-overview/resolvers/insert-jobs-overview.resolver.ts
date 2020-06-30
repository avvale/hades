import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateJobOverviewInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { InsertJobsOverviewCommand } from '@hades/bplus-it-sappi/job-overview/application/insert/insert-jobs-overview.command';

@Resolver()
export class InsertJobsOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiInsertJobsOverview')
    async main(@Args('payload') payload: BplusItSappiCreateJobOverviewInput[])
    {
        await this.commandBus.dispatch(new InsertJobsOverviewCommand(payload));
        return true;
    }
}