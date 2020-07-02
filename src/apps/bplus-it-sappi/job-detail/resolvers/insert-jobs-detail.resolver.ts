import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateJobDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { InsertJobsDetailCommand } from '@hades/bplus-it-sappi/job-detail/application/insert/insert-jobs-detail.command';

@Resolver()
export class InsertJobsDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiInsertJobsDetail')
    async main(@Args('payload') payload: BplusItSappiCreateJobDetailInput[])
    {
        await this.commandBus.dispatch(new InsertJobsDetailCommand(payload));
        return true;
    }
}