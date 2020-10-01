import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
    MessageOverviewWaiting,
    MessageOverviewCreatedAt,
    MessageOverviewUpdatedAt,
    MessageOverviewDeletedAt
    
} from './../../domain/value-objects';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { CciMessageOverview } from './../../domain/message-overview.aggregate';

@Injectable()
export class UpdateMessageOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IMessageOverviewRepository
    ) {}

    public async main(
        id: MessageOverviewId,
        tenantId?: MessageOverviewTenantId,
        tenantCode?: MessageOverviewTenantCode,
        systemId?: MessageOverviewSystemId,
        systemName?: MessageOverviewSystemName,
        executionId?: MessageOverviewExecutionId,
        executionType?: MessageOverviewExecutionType,
        executionExecutedAt?: MessageOverviewExecutionExecutedAt,
        executionMonitoringStartAt?: MessageOverviewExecutionMonitoringStartAt,
        executionMonitoringEndAt?: MessageOverviewExecutionMonitoringEndAt,
        numberMax?: MessageOverviewNumberMax,
        numberDays?: MessageOverviewNumberDays,
        success?: MessageOverviewSuccess,
        cancelled?: MessageOverviewCancelled,
        delivering?: MessageOverviewDelivering,
        error?: MessageOverviewError,
        holding?: MessageOverviewHolding,
        toBeDelivered?: MessageOverviewToBeDelivered,
        waiting?: MessageOverviewWaiting,
        
    ): Promise<void>
    {        
        // create aggregate with factory pattern
        const messageOverview = CciMessageOverview.register(
            id,
            tenantId,
            tenantCode,
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
            null,
            new MessageOverviewUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(messageOverview);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const messageOverviewRegister = this.publisher.mergeObjectContext(
            messageOverview
        );
        
        messageOverviewRegister.updated(messageOverview); // apply event to model events
        messageOverviewRegister.commit(); // commit all events of model
    }
}