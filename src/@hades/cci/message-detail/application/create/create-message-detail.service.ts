import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    MessageDetailId,
    MessageDetailTenantId,
    MessageDetailTenantCode,
    MessageDetailSystemId,
    MessageDetailSystemName,
    MessageDetailScenario,
    MessageDetailExecutionId,
    MessageDetailExecutionType,
    MessageDetailExecutionExecutedAt,
    MessageDetailExecutionMonitoringStartAt,
    MessageDetailExecutionMonitoringEndAt,
    MessageDetailFlowHash,
    MessageDetailFlowParty,
    MessageDetailFlowReceiverParty,
    MessageDetailFlowComponent,
    MessageDetailFlowReceiverComponent,
    MessageDetailFlowInterfaceName,
    MessageDetailFlowInterfaceNamespace,
    MessageDetailStatus,
    MessageDetailRefMessageId,
    MessageDetailDetail,
    MessageDetailExample,
    MessageDetailStartTimeAt,
    MessageDetailDirection,
    MessageDetailErrorCategory,
    MessageDetailErrorCode,
    MessageDetailErrorLabel,
    MessageDetailNode,
    MessageDetailProtocol,
    MessageDetailQualityOfService,
    MessageDetailReceiverParty,
    MessageDetailReceiverComponent,
    MessageDetailReceiverInterface,
    MessageDetailReceiverInterfaceNamespace,
    MessageDetailRetries,
    MessageDetailSize,
    MessageDetailTimesFailed,
    MessageDetailNumberMax,
    MessageDetailNumberDays,
    MessageDetailCreatedAt,
    MessageDetailUpdatedAt,
    MessageDetailDeletedAt,
} from './../../domain/value-objects';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { CciMessageDetail } from './../../domain/message-detail.aggregate';

@Injectable()
export class CreateMessageDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IMessageDetailRepository,
    ) {}

    public async main(
        payload: {
            id: MessageDetailId,
            tenantId: MessageDetailTenantId,
            tenantCode: MessageDetailTenantCode,
            systemId: MessageDetailSystemId,
            systemName: MessageDetailSystemName,
            scenario: MessageDetailScenario,
            executionId: MessageDetailExecutionId,
            executionType: MessageDetailExecutionType,
            executionExecutedAt: MessageDetailExecutionExecutedAt,
            executionMonitoringStartAt: MessageDetailExecutionMonitoringStartAt,
            executionMonitoringEndAt: MessageDetailExecutionMonitoringEndAt,
            flowHash: MessageDetailFlowHash,
            flowParty: MessageDetailFlowParty,
            flowReceiverParty: MessageDetailFlowReceiverParty,
            flowComponent: MessageDetailFlowComponent,
            flowReceiverComponent: MessageDetailFlowReceiverComponent,
            flowInterfaceName: MessageDetailFlowInterfaceName,
            flowInterfaceNamespace: MessageDetailFlowInterfaceNamespace,
            status: MessageDetailStatus,
            refMessageId: MessageDetailRefMessageId,
            detail: MessageDetailDetail,
            example: MessageDetailExample,
            startTimeAt: MessageDetailStartTimeAt,
            direction: MessageDetailDirection,
            errorCategory: MessageDetailErrorCategory,
            errorCode: MessageDetailErrorCode,
            errorLabel: MessageDetailErrorLabel,
            node: MessageDetailNode,
            protocol: MessageDetailProtocol,
            qualityOfService: MessageDetailQualityOfService,
            receiverParty: MessageDetailReceiverParty,
            receiverComponent: MessageDetailReceiverComponent,
            receiverInterface: MessageDetailReceiverInterface,
            receiverInterfaceNamespace: MessageDetailReceiverInterfaceNamespace,
            retries: MessageDetailRetries,
            size: MessageDetailSize,
            timesFailed: MessageDetailTimesFailed,
            numberMax: MessageDetailNumberMax,
            numberDays: MessageDetailNumberDays,
        }
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const messageDetail = CciMessageDetail.register(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.scenario,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.flowHash,
            payload.flowParty,
            payload.flowReceiverParty,
            payload.flowComponent,
            payload.flowReceiverComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.status,
            payload.refMessageId,
            payload.detail,
            payload.example,
            payload.startTimeAt,
            payload.direction,
            payload.errorCategory,
            payload.errorCode,
            payload.errorLabel,
            payload.node,
            payload.protocol,
            payload.qualityOfService,
            payload.receiverParty,
            payload.receiverComponent,
            payload.receiverInterface,
            payload.receiverInterfaceNamespace,
            payload.retries,
            payload.size,
            payload.timesFailed,
            payload.numberMax,
            payload.numberDays,
            new MessageDetailCreatedAt({currentTimestamp: true}),
            new MessageDetailUpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create(messageDetail);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const messageDetailRegister = this.publisher.mergeObjectContext(
            messageDetail
        );

        messageDetailRegister.created(messageDetail); // apply event to model events
        messageDetailRegister.commit(); // commit all events of model
    }
}