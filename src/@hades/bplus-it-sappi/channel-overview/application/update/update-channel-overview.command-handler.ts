import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateChannelOverviewCommand } from './update-channel-overview.command';
import { UpdateChannelOverviewService } from './update-channel-overview.service';
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

@CommandHandler(UpdateChannelOverviewCommand)
export class UpdateChannelOverviewCommandHandler implements ICommandHandler<UpdateChannelOverviewCommand>
{
    constructor(
        private readonly updateChannelOverviewService: UpdateChannelOverviewService
    ) { }

    async execute(command: UpdateChannelOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateChannelOverviewService.main(
            new ChannelOverviewId(command.id),
            new ChannelOverviewTenantId(command.tenantId, { undefinable: true }),
            new ChannelOverviewSystemId(command.systemId, { undefinable: true }),
            new ChannelOverviewSystemName(command.systemName, { undefinable: true }),
            new ChannelOverviewExecutionId(command.executionId, { undefinable: true }),
            new ChannelOverviewExecutionType(command.executionType, { undefinable: true }),
            new ChannelOverviewExecutionExecutedAt(command.executionExecutedAt, { undefinable: true }),
            new ChannelOverviewExecutionMonitoringStartAt(command.executionMonitoringStartAt, { undefinable: true }),
            new ChannelOverviewExecutionMonitoringEndAt(command.executionMonitoringEndAt, { undefinable: true }),
            new ChannelOverviewError(command.error),
            new ChannelOverviewInactive(command.inactive),
            new ChannelOverviewSuccessful(command.successful),
            new ChannelOverviewStopped(command.stopped),
            new ChannelOverviewUnknown(command.unknown),
            new ChannelOverviewUnregistered(command.unregistered),
            
        )
    }
}