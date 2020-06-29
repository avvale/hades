import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateJobInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { CreateJobCommand } from '@hades/bplus-it-sappi/job/application/create/create-job.command';
import { FindJobByIdQuery } from '@hades/bplus-it-sappi/job/application/find/find-job-by-id.query';

@Resolver()
export class CreateJobResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateJob')
    async main(@Args('payload') payload: BplusItSappiCreateJobInput)
    {
        await this.commandBus.dispatch(new CreateJobCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.cancelled,
            payload.completed,
            payload.error,
            
        ));
        
        return await this.queryBus.ask(new FindJobByIdQuery(payload.id));
    }
}