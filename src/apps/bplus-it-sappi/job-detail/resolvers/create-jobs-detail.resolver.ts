import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateJobDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateJobsDetailCommand } from '@hades/bplus-it-sappi/job-detail/application/create/create-jobs-detail.command';

@Resolver()
export class CreateJobsDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateJobsDetail')
    async main(@Args('payload') payload: BplusItSappiCreateJobDetailInput[])
    {
        await this.commandBus.dispatch(new CreateJobsDetailCommand(payload));
        return true;
    }
}