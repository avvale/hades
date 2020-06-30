import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiUpdateJobOverviewInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateJobOverviewCommand } from '@hades/bplus-it-sappi/job-overview/application/update/update-job-overview.command';
import { FindJobOverviewByIdQuery } from '@hades/bplus-it-sappi/job-overview/application/find/find-job-overview-by-id.query';

@Resolver()
export class UpdateJobOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiUpdateJobOverview')
    async main(@Args('payload') payload: BplusItSappiUpdateJobOverviewInput)
    {
        await this.commandBus.dispatch(new UpdateJobOverviewCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
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