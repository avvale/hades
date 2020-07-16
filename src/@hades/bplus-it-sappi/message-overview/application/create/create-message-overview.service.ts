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

@Injectable()
export class CreateMessageOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IMessageOverviewRepository
    ) {}

    public async main(
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
        
    ): Promise<void>
    {
        // create object with factory pattern
        const messageOverview = BplusItSappiMessageOverview.register(
            id,
            tenantId,
            systemId,
            systemName,
            executionId,
            executionType,
            executionExecutedAt,
            executionMonitoringStartAt,
            executionMonitoringEndAt,
            numberMax,
            numberDays,
            success,
            cancelled,
            delivering,
            error,
            holding,
            toBeDelivered,
            waiting,
            new MessageOverviewCreatedAt(Utils.nowTimestamp()),
            new MessageOverviewUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(messageOverview);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const messageOverviewRegister = this.publisher.mergeObjectContext(
            messageOverview
        );
        
        messageOverviewRegister.created(messageOverview); // apply event to model events
        messageOverviewRegister.commit(); // commit all events of model
    }
}