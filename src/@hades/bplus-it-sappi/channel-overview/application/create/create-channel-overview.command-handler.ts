import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChannelOverviewCommand } from './create-channel-overview.command';
import { CreateChannelOverviewService } from './create-channel-overview.service';
import { 
    ChannelOverviewId, 
    ChannelOverviewTenantId, 
    ChannelOverviewTenantCode, 
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

@CommandHandler(CreateChannelOverviewCommand)
export class CreateChannelOverviewCommandHandler implements ICommandHandler<CreateChannelOverviewCommand>
{
    constructor(
        private readonly createChannelOverviewService: CreateChannelOverviewService
    ) { }

    async execute(command: CreateChannelOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createChannelOverviewService.main(
            new ChannelOverviewId(command.id),
            new ChannelOverviewTenantId(command.tenantId),
            new ChannelOverviewTenantCode(command.tenantCode),
            new ChannelOverviewSystemId(command.systemId),
            new ChannelOverviewSystemName(command.systemName),
            new ChannelOverviewExecutionId(command.executionId),
            new ChannelOverviewExecutionType(command.executionType),
            new ChannelOverviewExecutionExecutedAt(command.executionExecutedAt),
            new ChannelOverviewExecutionMonitoringStartAt(command.executionMonitoringStartAt),
            new ChannelOverviewExecutionMonitoringEndAt(command.executionMonitoringEndAt),
            new ChannelOverviewError(command.error),
            new ChannelOverviewInactive(command.inactive),
            new ChannelOverviewSuccessful(command.successful),
            new ChannelOverviewStopped(command.stopped),
            new ChannelOverviewUnknown(command.unknown),
            new ChannelOverviewUnregistered(command.unregistered),
            
        );
    }
}