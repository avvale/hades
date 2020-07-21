import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
    MessageOverviewWaiting, 
    MessageOverviewCreatedAt, 
    MessageOverviewUpdatedAt, 
    MessageOverviewDeletedAt
    
} from './../../domain/value-objects';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { BplusItSappiMessageOverview } from './../../domain/message-overview.aggregate';
import { AddMessagesOverviewContextEvent } from './../events/add-messages-overview-context.event';

@Injectable()
export class CreateMessagesOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IMessageOverviewRepository
    ) {}

    public async main(
        messagesOverview: {
            id: MessageOverviewId,
            tenantId: MessageOverviewTenantId,
            systemId: MessageOverviewSystemId,
            systemName: MessageOverviewSystemName,
            executionId: MessageOverviewExecutionId,
            executionType: MessageOverviewExecutionType,
            executionExecutedAt: MessageOverviewExecutionExecutedAt,
            executionMonitoringStartAt: MessageOverviewExecutionMonitoringStartAt,
            executionMonitoringEndAt: MessageOverviewExecutionMonitoringEndAt,
            numberMax: MessageOverviewNumberMax,
            numberDays: MessageOverviewNumberDays,
            success: MessageOverviewSuccess,
            cancelled: MessageOverviewCancelled,
            delivering: MessageOverviewDelivering,
            error: MessageOverviewError,
            holding: MessageOverviewHolding,
            toBeDelivered: MessageOverviewToBeDelivered,
            waiting: MessageOverviewWaiting,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateMessagesOverview = messagesOverview.map(messageOverview => BplusItSappiMessageOverview.register(
            messageOverview.id,
            messageOverview.tenantId,
            messageOverview.systemId,
            messageOverview.systemName,
            messageOverview.executionId,
            messageOverview.executionType,
            messageOverview.executionExecutedAt,
            messageOverview.executionMonitoringStartAt,
            messageOverview.executionMonitoringEndAt,
            messageOverview.numberMax,
            messageOverview.numberDays,
            messageOverview.success,
            messageOverview.cancelled,
            messageOverview.delivering,
            messageOverview.error,
            messageOverview.holding,
            messageOverview.toBeDelivered,
            messageOverview.waiting,
            new MessageOverviewCreatedAt(Utils.nowTimestamp()),
            new MessageOverviewUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateMessagesOverview);

        // create AddMessagesOverviewContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const messagesOverviewRegistered = this.publisher.mergeObjectContext(new AddMessagesOverviewContextEvent(aggregateMessagesOverview));
 
        messagesOverviewRegistered.created(); // apply event to model events
        messagesOverviewRegistered.commit(); // commit all events of model
    }
}