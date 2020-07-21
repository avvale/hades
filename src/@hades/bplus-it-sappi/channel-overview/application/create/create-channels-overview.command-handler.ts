import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChannelsOverviewCommand } from './create-channels-overview.command';
import { CreateChannelsOverviewService } from './create-channels-overview.service';
import { 
    ChannelOverviewId, 
    ChannelOverviewTenantId, 
    ChannelOverviewSystemId, 
    ChannelOverviewSystemName, 
    ChannelOverviewExecutionId, 
    ChannelOverviewExecutionType, 
    ChannelOverviewExecutionExecutedAt, 
    ChannelOverviewExecutionMonitoringStartAt, 
    ChannelOverviewExecutionMonitoringEndAt, 
    ChannelOverviewError, 
    ChannelOverviewInactive, 
    ChannelOverviewSuccessful, 
    ChannelOverviewStopped, 
    ChannelOverviewUnknown, 
    ChannelOverviewUnregistered
    
} from './../../domain/value-objects';

@CommandHandler(CreateChannelsOverviewCommand)
export class CreateChannelsOverviewCommandHandler implements ICommandHandler<CreateChannelsOverviewCommand>
{
    constructor(
        private readonly createChannelsOverviewService: CreateChannelsOverviewService
    ) { }

    async execute(command: CreateChannelsOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createChannelsOverviewService.main(
            command.channelsOverview
                .map(channelOverview => { 
                    return {
                        id: new ChannelOverviewId(channelOverview.id),
                        tenantId: new ChannelOverviewTenantId(channelOverview.tenantId),
                        systemId: new ChannelOverviewSystemId(channelOverview.systemId),
                        systemName: new ChannelOverviewSystemName(channelOverview.systemName),
                        executionId: new ChannelOverviewExecutionId(channelOverview.executionId),
                        executionType: new ChannelOverviewExecutionType(channelOverview.executionType),
                        executionExecutedAt: new ChannelOverviewExecutionExecutedAt(channelOverview.executionExecutedAt),
                        executionMonitoringStartAt: new ChannelOverviewExecutionMonitoringStartAt(channelOverview.executionMonitoringStartAt),
                        executionMonitoringEndAt: new ChannelOverviewExecutionMonitoringEndAt(channelOverview.executionMonitoringEndAt),
                        error: new ChannelOverviewError(channelOverview.error),
                        inactive: new ChannelOverviewInactive(channelOverview.inactive),
                        successful: new ChannelOverviewSuccessful(channelOverview.successful),
                        stopped: new ChannelOverviewStopped(channelOverview.stopped),
                        unknown: new ChannelOverviewUnknown(channelOverview.unknown),
                        unregistered: new ChannelOverviewUnregistered(channelOverview.unregistered),
                        
                    }
                })
        );
    }
}