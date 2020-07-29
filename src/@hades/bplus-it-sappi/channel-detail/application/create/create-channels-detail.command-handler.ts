import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChannelsDetailCommand } from './create-channels-detail.command';
import { CreateChannelsDetailService } from './create-channels-detail.service';
import { 
    ChannelDetailId, 
    ChannelDetailTenantId, 
    ChannelDetailTenantCode, 
    ChannelDetailSystemId, 
    ChannelDetailSystemName, 
    ChannelDetailExecutionId, 
    ChannelDetailExecutionType, 
    ChannelDetailExecutionExecutedAt, 
    ChannelDetailExecutionMonitoringStartAt, 
    ChannelDetailExecutionMonitoringEndAt, 
    ChannelDetailStatus, 
    ChannelDetailChannelHash, 
    ChannelDetailChannelSapId, 
    ChannelDetailChannelParty, 
    ChannelDetailChannelComponent, 
    ChannelDetailChannelName, 
    ChannelDetailDetail
    
} from './../../domain/value-objects';

@CommandHandler(CreateChannelsDetailCommand)
export class CreateChannelsDetailCommandHandler implements ICommandHandler<CreateChannelsDetailCommand>
{
    constructor(
        private readonly createChannelsDetailService: CreateChannelsDetailService
    ) { }

    async execute(command: CreateChannelsDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createChannelsDetailService.main(
            command.channelsDetail
                .map(channelDetail => { 
                    return {
                        id: new ChannelDetailId(channelDetail.id),
                        tenantId: new ChannelDetailTenantId(channelDetail.tenantId),
                        tenantCode: new ChannelDetailTenantCode(channelDetail.tenantCode),
                        systemId: new ChannelDetailSystemId(channelDetail.systemId),
                        systemName: new ChannelDetailSystemName(channelDetail.systemName),
                        executionId: new ChannelDetailExecutionId(channelDetail.executionId),
                        executionType: new ChannelDetailExecutionType(channelDetail.executionType),
                        executionExecutedAt: new ChannelDetailExecutionExecutedAt(channelDetail.executionExecutedAt),
                        executionMonitoringStartAt: new ChannelDetailExecutionMonitoringStartAt(channelDetail.executionMonitoringStartAt),
                        executionMonitoringEndAt: new ChannelDetailExecutionMonitoringEndAt(channelDetail.executionMonitoringEndAt),
                        status: new ChannelDetailStatus(channelDetail.status),
                        channelHash: new ChannelDetailChannelHash(channelDetail.channelHash),
                        channelSapId: new ChannelDetailChannelSapId(channelDetail.channelSapId),
                        channelParty: new ChannelDetailChannelParty(channelDetail.channelParty),
                        channelComponent: new ChannelDetailChannelComponent(channelDetail.channelComponent),
                        channelName: new ChannelDetailChannelName(channelDetail.channelName),
                        detail: new ChannelDetailDetail(channelDetail.detail),
                        
                    }
                })
        );
    }
}