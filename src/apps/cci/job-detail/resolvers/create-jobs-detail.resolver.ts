import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciCreateJobDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateJobsDetailCommand } from '@hades/cci/job-detail/application/create/create-jobs-detail.command';

@Resolver()
export class CreateJobsDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateJobsDetail')
    async main(@Args('payload') payload: CciCreateJobDetailInput[])
    {
        await this.commandBus.dispatch(new CreateJobsDetailCommand(payload));
        return true;
    }
}