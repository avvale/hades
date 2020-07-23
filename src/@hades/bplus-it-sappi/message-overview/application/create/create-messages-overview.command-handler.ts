import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMessagesOverviewCommand } from './create-messages-overview.command';
import { CreateMessagesOverviewService } from './create-messages-overview.service';
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

@CommandHandler(CreateMessagesOverviewCommand)
export class CreateMessagesOverviewCommandHandler implements ICommandHandler<CreateMessagesOverviewCommand>
{
    constructor(
        private readonly createMessagesOverviewService: CreateMessagesOverviewService
    ) { }

    async execute(command: CreateMessagesOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createMessagesOverviewService.main(
            command.messagesOverview
                .map(messageOverview => { 
                    return {
                        id: new MessageOverviewId(messageOverview.id),
                        tenantId: new MessageOverviewTenantId(messageOverview.tenantId),
                        tenantCode: new MessageOverviewTenantCode(messageOverview.tenantCode),
                        systemId: new MessageOverviewSystemId(messageOverview.systemId),
                        systemName: new MessageOverviewSystemName(messageOverview.systemName),
                        executionId: new MessageOverviewExecutionId(messageOverview.executionId),
                        executionType: new MessageOverviewExecutionType(messageOverview.executionType),
                        executionExecutedAt: new MessageOverviewExecutionExecutedAt(messageOverview.executionExecutedAt),
                        executionMonitoringStartAt: new MessageOverviewExecutionMonitoringStartAt(messageOverview.executionMonitoringStartAt),
                        executionMonitoringEndAt: new MessageOverviewExecutionMonitoringEndAt(messageOverview.executionMonitoringEndAt),
                        numberMax: new MessageOverviewNumberMax(messageOverview.numberMax),
                        numberDays: new MessageOverviewNumberDays(messageOverview.numberDays),
                        success: new MessageOverviewSuccess(messageOverview.success),
                        cancelled: new MessageOverviewCancelled(messageOverview.cancelled),
                        delivering: new MessageOverviewDelivering(messageOverview.delivering),
                        error: new MessageOverviewError(messageOverview.error),
                        holding: new MessageOverviewHolding(messageOverview.holding),
                        toBeDelivered: new MessageOverviewToBeDelivered(messageOverview.toBeDelivered),
                        waiting: new MessageOverviewWaiting(messageOverview.waiting),
                        
                    }
                })
        );
    }
}