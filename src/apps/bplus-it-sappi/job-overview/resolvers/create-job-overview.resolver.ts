import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateJobOverviewInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateJobOverviewCommand } from '@hades/bplus-it-sappi/job-overview/application/create/create-job-overview.command';
import { FindJobOverviewByIdQuery } from '@hades/bplus-it-sappi/job-overview/application/find/find-job-overview-by-id.query';

@Resolver()
export class CreateJobOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateJobOverview')
    async main(@Args('payload') payload: BplusItSappiCreateJobOverviewInput)
    {
        await this.commandBus.dispatch(new CreateJobOverviewCommand(
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
            payload.cancelled,
            payload.completed,
            payload.error,
            
        ));
        
        return await this.queryBus.ask(new FindJobOverviewByIdQuery(payload.id));
    }
}