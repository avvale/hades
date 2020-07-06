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
import { BplusItSappiMessageOverview } from './../../domain/message-overview.entity';

@Injectable()
export class InsertMessagesOverviewService
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
        const entityMessagesOverview = messagesOverview.map(messageOverview => BplusItSappiMessageOverview.register(
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
        await this.repository.insert(entityMessagesOverview);

        // TODO a falta de definir eventos
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        // const messagesOverviewRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id)
        // );
        // 
        // messagesOverviewRegistered.created(messagesOverview); // apply event to model events
        // messagesOverviewRegistered.commit(); // commit all events of model
    }
}