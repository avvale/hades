import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
    MessageOverviewDeletedAt,
} from './../../domain/value-objects';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { CciMessageOverview } from './../../domain/message-overview.aggregate';

@Injectable()
export class CreateMessageOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IMessageOverviewRepository,
    ) {}

    public async main(
        payload: {
            id: MessageOverviewId,
            tenantId: MessageOverviewTenantId,
            tenantCode: MessageOverviewTenantCode,
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
        },
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const messageOverview = CciMessageOverview.register(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.numberMax,
            payload.numberDays,
            payload.success,
            payload.cancelled,
            payload.delivering,
            payload.error,
            payload.holding,
            payload.toBeDelivered,
            payload.waiting,
            new MessageOverviewCreatedAt({currentTimestamp: true}),
            new MessageOverviewUpdatedAt({currentTimestamp: true}),
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