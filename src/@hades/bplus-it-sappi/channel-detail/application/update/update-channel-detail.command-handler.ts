import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateChannelDetailCommand } from './update-channel-detail.command';
import { UpdateChannelDetailService } from './update-channel-detail.service';
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
    ChannelDetailChannelId, 
    ChannelDetailChannelSapId, 
    ChannelDetailChannelParty, 
    ChannelDetailChannelComponent, 
    ChannelDetailChannelName, 
    ChannelDetailDetail
    
} from './../../domain/value-objects';

@CommandHandler(UpdateChannelDetailCommand)
export class UpdateChannelDetailCommandHandler implements ICommandHandler<UpdateChannelDetailCommand>
{
    constructor(
        private readonly updateChannelDetailService: UpdateChannelDetailService
    ) { }

    async execute(command: UpdateChannelDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateChannelDetailService.main(
            new ChannelDetailId(command.id),
            new ChannelDetailTenantId(command.tenantId, { undefinable: true }),
            new ChannelDetailTenantCode(command.tenantCode, { undefinable: true }),
            new ChannelDetailSystemId(command.systemId, { undefinable: true }),
            new ChannelDetailSystemName(command.systemName, { undefinable: true }),
            new ChannelDetailExecutionId(command.executionId, { undefinable: true }),
            new ChannelDetailExecutionType(command.executionType, { undefinable: true }),
            new ChannelDetailExecutionExecutedAt(command.executionExecutedAt, { undefinable: true }),
            new ChannelDetailExecutionMonitoringStartAt(command.executionMonitoringStartAt, { undefinable: true }),
            new ChannelDetailExecutionMonitoringEndAt(command.executionMonitoringEndAt, { undefinable: true }),
            new ChannelDetailStatus(command.status, { undefinable: true }),
            new ChannelDetailChannelId(command.channelId),
            new ChannelDetailChannelSapId(command.channelSapId, { undefinable: true }),
            new ChannelDetailChannelParty(command.channelParty),
            new ChannelDetailChannelComponent(command.channelComponent, { undefinable: true }),
            new ChannelDetailChannelName(command.channelName, { undefinable: true }),
            new ChannelDetailDetail(command.detail),
            
        )
    }
}