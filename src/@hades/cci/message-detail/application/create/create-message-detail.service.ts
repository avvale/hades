import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
    MessageDetailDeletedAt
    
} from './../../domain/value-objects';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { CciMessageDetail } from './../../domain/message-detail.aggregate';

@Injectable()
export class CreateMessageDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IMessageDetailRepository
    ) {}

    public async main(
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
        
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const messageDetail = CciMessageDetail.register(
            id,
            tenantId,
            tenantCode,
            systemId,
            systemName,
            scenario,
            executionId,
            executionType,
            executionExecutedAt,
            executionMonitoringStartAt,
            executionMonitoringEndAt,
            flowHash,
            flowParty,
            flowReceiverParty,
            flowComponent,
            flowReceiverComponent,
            flowInterfaceName,
            flowInterfaceNamespace,
            status,
            refMessageId,
            detail,
            example,
            startTimeAt,
            direction,
            errorCategory,
            errorCode,
            errorLabel,
            node,
            protocol,
            qualityOfService,
            receiverParty,
            receiverComponent,
            receiverInterface,
            receiverInterfaceNamespace,
            retries,
            size,
            timesFailed,
            numberMax,
            numberDays,
            new MessageDetailCreatedAt(Utils.nowTimestamp()),
            new MessageDetailUpdatedAt(Utils.nowTimestamp()),
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