import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChannelDetailCommand } from './create-channel-detail.command';
import { CreateChannelDetailService } from './create-channel-detail.service';
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

@CommandHandler(CreateChannelDetailCommand)
export class CreateChannelDetailCommandHandler implements ICommandHandler<CreateChannelDetailCommand>
{
    constructor(
        private readonly createChannelDetailService: CreateChannelDetailService
    ) { }

    async execute(command: CreateChannelDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createChannelDetailService.main(
            new ChannelDetailId(command.id),
            new ChannelDetailTenantId(command.tenantId),
            new ChannelDetailSystemId(command.systemId),
            new ChannelDetailSystemName(command.systemName),
            new ChannelDetailExecutionId(command.executionId),
            new ChannelDetailExecutionType(command.executionType),
            new ChannelDetailExecutionExecutedAt(command.executionExecutedAt),
            new ChannelDetailExecutionMonitoringStartAt(command.executionMonitoringStartAt),
            new ChannelDetailExecutionMonitoringEndAt(command.executionMonitoringEndAt),
            new ChannelDetailStatus(command.status),
            new ChannelDetailChannelId(command.channelId),
            new ChannelDetailChannelParty(command.channelParty),
            new ChannelDetailChannelComponent(command.channelComponent),
            new ChannelDetailChannelName(command.channelName),
            new ChannelDetailDetail(command.detail),
            new ChannelDetailExample(command.example),
            
        );
    }
}