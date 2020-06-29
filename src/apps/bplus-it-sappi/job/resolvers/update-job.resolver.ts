import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiUpdateJobInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateJobCommand } from '@hades/bplus-it-sappi/job/application/update/update-job.command';
import { FindJobByIdQuery } from '@hades/bplus-it-sappi/job/application/find/find-job-by-id.query';

@Resolver()
export class UpdateJobResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiUpdateJob')
    async main(@Args('payload') payload: BplusItSappiUpdateJobInput)
    {
        await this.commandBus.dispatch(new UpdateJobCommand(
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