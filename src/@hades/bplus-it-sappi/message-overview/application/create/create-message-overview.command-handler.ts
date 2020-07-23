import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMessageOverviewCommand } from './create-message-overview.command';
import { CreateMessageOverviewService } from './create-message-overview.service';
import { 
    MessageOverviewId, 
    MessageOverviewTenantId, 
    MessageOverviewTenantCode, 
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

@CommandHandler(CreateMessageOverviewCommand)
export class CreateMessageOverviewCommandHandler implements ICommandHandler<CreateMessageOverviewCommand>
{
    constructor(
        private readonly createMessageOverviewService: CreateMessageOverviewService
    ) { }

    async execute(command: CreateMessageOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createMessageOverviewService.main(
            new MessageOverviewId(command.id),
            new MessageOverviewTenantId(command.tenantId),
            new MessageOverviewTenantCode(command.tenantCode),
            new MessageOverviewSystemId(command.systemId),
            new MessageOverviewSystemName(command.systemName),
            new MessageOverviewExecutionId(command.executionId),
            new MessageOverviewExecutionType(command.executionType),
            new MessageOverviewExecutionExecutedAt(command.executionExecutedAt),
            new MessageOverviewExecutionMonitoringStartAt(command.executionMonitoringStartAt),
            new MessageOverviewExecutionMonitoringEndAt(command.executionMonitoringEndAt),
            new MessageOverviewNumberMax(command.numberMax),
            new MessageOverviewNumberDays(command.numberDays),
            new MessageOverviewSuccess(command.success),
            new MessageOverviewCancelled(command.cancelled),
            new MessageOverviewDelivering(command.delivering),
            new MessageOverviewError(command.error),
            new MessageOverviewHolding(command.holding),
            new MessageOverviewToBeDelivered(command.toBeDelivered),
            new MessageOverviewWaiting(command.waiting),
            
        );
    }
}