import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertChannelsDetailCommand } from './insert-channels-detail.command';
import { InsertChannelsDetailService } from './insert-channels-detail.service';
import { 
    ChannelDetailId, 
    ChannelDetailTenantId, 
    ChannelDetailSystemId, 
    ChannelDetailSystemName, 
    ChannelDetailExecutionId, 
    ChannelDetailExecutionType, 
    ChannelDetailExecutionExecutedAt, 
    ChannelDetailExecutionMonitoringStartAt, 
    ChannelDetailExecutionMonitoringEndAt, 
    ChannelDetailStatus, 
    ChannelDetailChannelId, 
    ChannelDetailChannelParty, 
    ChannelDetailChannelComponent, 
    ChannelDetailChannelName, 
    ChannelDetailDetail, 
    ChannelDetailExample
    
} from './../../domain/value-objects';

@CommandHandler(InsertChannelsDetailCommand)
export class InsertChannelsDetailCommandHandler implements ICommandHandler<InsertChannelsDetailCommand>
{
    constructor(
        private readonly insertChannelsDetailService: InsertChannelsDetailService
    ) { }

    async execute(command: InsertChannelsDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertChannelsDetailService.main(
            command.channelsDetail
                .map(channelDetail => { 
                    return {
                        id: new ChannelDetailId(channelDetail.id),
                        tenantId: new ChannelDetailTenantId(channelDetail.tenantId),
                        systemId: new ChannelDetailSystemId(channelDetail.systemId),
                        systemName: new ChannelDetailSystemName(channelDetail.systemName),
                        executionId: new ChannelDetailExecutionId(channelDetail.executionId),
                        executionType: new ChannelDetailExecutionType(channelDetail.executionType),
                        executionExecutedAt: new ChannelDetailExecutionExecutedAt(channelDetail.executionExecutedAt),
                        executionMonitoringStartAt: new ChannelDetailExecutionMonitoringStartAt(channelDetail.executionMonitoringStartAt),
                        executionMonitoringEndAt: new ChannelDetailExecutionMonitoringEndAt(channelDetail.executionMonitoringEndAt),
                        status: new ChannelDetailStatus(channelDetail.status),
                        channelId: new ChannelDetailChannelId(channelDetail.channelId),
                        channelParty: new ChannelDetailChannelParty(channelDetail.channelParty),
                        channelComponent: new ChannelDetailChannelComponent(channelDetail.channelComponent),
                        channelName: new ChannelDetailChannelName(channelDetail.channelName),
                        detail: new ChannelDetailDetail(channelDetail.detail),
                        example: new ChannelDetailExample(channelDetail.example),
                        
                    }
                })
        );
    }
}