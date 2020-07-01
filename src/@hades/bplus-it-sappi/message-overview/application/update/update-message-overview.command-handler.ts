import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMessageOverviewCommand } from './update-message-overview.command';
import { UpdateMessageOverviewService } from './update-message-overview.service';
import { 
    MessageOverviewId, 
    MessageOverviewTenantId, 
    MessageOverviewSystemId, 
    MessageOverviewSystemName, 
    MessageOverviewExecutionId, 
    MessageOverviewExecutionType, 
    MessageOverviewExecutionExecutedAt, 
    MessageOverviewExecutionMonitoringStartAt, 
    MessageOverviewExecutionMonitoringEndAt, 
    MessageOverviewNumberMax, 
    MessageOverviewNumberDays, 
    MessageOverviewSuccess, 
    MessageOverviewCancelled, 
    MessageOverviewDelivering, 
    MessageOverviewError, 
    MessageOverviewHolding, 
    MessageOverviewToBeDelivered, 
    MessageOverviewWaiting
    
} from './../../domain/value-objects';

@CommandHandler(UpdateMessageOverviewCommand)
export class UpdateMessageOverviewCommandHandler implements ICommandHandler<UpdateMessageOverviewCommand>
{
    constructor(
        private readonly updateMessageOverviewService: UpdateMessageOverviewService
    ) { }

    async execute(command: UpdateMessageOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateMessageOverviewService.main(
            new MessageOverviewId(command.id),
            new MessageOverviewTenantId(command.tenantId, { undefinable: true }),
            new MessageOverviewSystemId(command.systemId, { undefinable: true }),
            new MessageOverviewSystemName(command.systemName, { undefinable: true }),
            new MessageOverviewExecutionId(command.executionId, { undefinable: true }),
            new MessageOverviewExecutionType(command.executionType, { undefinable: true }),
            new MessageOverviewExecutionExecutedAt(command.executionExecutedAt, { undefinable: true }),
            new MessageOverviewExecutionMonitoringStartAt(command.executionMonitoringStartAt, { undefinable: true }),
            new MessageOverviewExecutionMonitoringEndAt(command.executionMonitoringEndAt, { undefinable: true }),
            new MessageOverviewNumberMax(command.numberMax),
            new MessageOverviewNumberDays(command.numberDays),
            new MessageOverviewSuccess(command.success),
            new MessageOverviewCancelled(command.cancelled),
            new MessageOverviewDelivering(command.delivering),
            new MessageOverviewError(command.error),
            new MessageOverviewHolding(command.holding),
            new MessageOverviewToBeDelivered(command.toBeDelivered),
            new MessageOverviewWaiting(command.waiting),
            
        )
    }
}