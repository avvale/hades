import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiUpdateJobDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateJobDetailCommand } from '@hades/bplus-it-sappi/job-detail/application/update/update-job-detail.command';
import { FindJobDetailByIdQuery } from '@hades/bplus-it-sappi/job-detail/application/find/find-job-detail-by-id.query';

@Resolver()
export class UpdateJobDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiUpdateJobDetail')
    async main(@Args('payload') payload: BplusItSappiUpdateJobDetailInput)
    {
        await this.commandBus.dispatch(new UpdateJobDetailCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.status,
            payload.detail,
            payload.example,
            
        ));
        
        return await this.queryBus.ask(new FindJobDetailByIdQuery(payload.id));
    }
}