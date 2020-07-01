import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertChannelsOverviewCommand } from './insert-channels-overview.command';
import { InsertChannelsOverviewService } from './insert-channels-overview.service';
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

@CommandHandler(InsertChannelsOverviewCommand)
export class InsertChannelsOverviewCommandHandler implements ICommandHandler<InsertChannelsOverviewCommand>
{
    constructor(
        private readonly insertChannelsOverviewService: InsertChannelsOverviewService
    ) { }

    async execute(command: InsertChannelsOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertChannelsOverviewService.main(
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