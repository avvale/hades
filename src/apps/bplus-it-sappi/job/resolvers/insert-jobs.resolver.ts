import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateJobInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { InsertJobsCommand } from '@hades/bplus-it-sappi/job/application/insert/insert-jobs.command';

@Resolver()
export class InsertJobsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiInsertJobs')
    async main(@Args('payload') payload: BplusItSappiCreateJobInput[])
    {
        await this.commandBus.dispatch(new InsertJobsCommand(payload));
        return true;
    }
}