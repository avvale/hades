import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateJobDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateJobDetailCommand } from '@hades/bplus-it-sappi/job-detail/application/create/create-job-detail.command';
import { FindJobDetailByIdQuery } from '@hades/bplus-it-sappi/job-detail/application/find/find-job-detail-by-id.query';

@Resolver()
export class CreateJobDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateJobDetail')
    async main(@Args('payload') payload: BplusItSappiCreateJobDetailInput)
    {
        await this.commandBus.dispatch(new CreateJobDetailCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.status,
            payload.name,
            payload.returnCode,
            payload.node,
            payload.user,
            payload.startAt,
            payload.endAt,
            
        ));
        
        return await this.queryBus.ask(new FindJobDetailByIdQuery(payload.id));
    }
}