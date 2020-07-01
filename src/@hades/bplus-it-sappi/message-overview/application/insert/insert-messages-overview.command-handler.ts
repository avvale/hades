import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertMessagesOverviewCommand } from './insert-messages-overview.command';
import { InsertMessagesOverviewService } from './insert-messages-overview.service';
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

@CommandHandler(InsertMessagesOverviewCommand)
export class InsertMessagesOverviewCommandHandler implements ICommandHandler<InsertMessagesOverviewCommand>
{
    constructor(
        private readonly insertMessagesOverviewService: InsertMessagesOverviewService
    ) { }

    async execute(command: InsertMessagesOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertMessagesOverviewService.main(
            command.messagesOverview
                .map(messageOverview => { 
                    return {
                        id: new MessageOverviewId(messageOverview.id),
                        tenantId: new MessageOverviewTenantId(messageOverview.tenantId),
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