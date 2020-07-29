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
    MessageDetailFlowComponent, 
    MessageDetailFlowInterfaceName, 
    MessageDetailFlowInterfaceNamespace, 
    MessageDetailStatus, 
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
    MessageDetailCreatedAt, 
    MessageDetailUpdatedAt, 
    MessageDetailDeletedAt
    
} from './../../domain/value-objects';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { BplusItSappiMessageDetail } from './../../domain/message-detail.aggregate';
import { AddMessagesDetailContextEvent } from './../events/add-messages-detail-context.event';

@Injectable()
export class CreateMessagesDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IMessageDetailRepository
    ) {}

    public async main(
        messagesDetail: {
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
            flowComponent: MessageDetailFlowComponent,
            flowInterfaceName: MessageDetailFlowInterfaceName,
            flowInterfaceNamespace: MessageDetailFlowInterfaceNamespace,
            status: MessageDetailStatus,
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
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateMessagesDetail = messagesDetail.map(messageDetail => BplusItSappiMessageDetail.register(
            messageDetail.id,
            messageDetail.tenantId,
            messageDetail.tenantCode,
            messageDetail.systemId,
            messageDetail.systemName,
            messageDetail.scenario,
            messageDetail.executionId,
            messageDetail.executionType,
            messageDetail.executionExecutedAt,
            messageDetail.executionMonitoringStartAt,
            messageDetail.executionMonitoringEndAt,
            messageDetail.flowHash,
            messageDetail.flowParty,
            messageDetail.flowComponent,
            messageDetail.flowInterfaceName,
            messageDetail.flowInterfaceNamespace,
            messageDetail.status,
            messageDetail.detail,
            messageDetail.example,
            messageDetail.startTimeAt,
            messageDetail.direction,
            messageDetail.errorCategory,
            messageDetail.errorCode,
            messageDetail.errorLabel,
            messageDetail.node,
            messageDetail.protocol,
            messageDetail.qualityOfService,
            messageDetail.receiverParty,
            messageDetail.receiverComponent,
            messageDetail.receiverInterface,
            messageDetail.receiverInterfaceNamespace,
            messageDetail.retries,
            messageDetail.size,
            messageDetail.timesFailed,
            new MessageDetailCreatedAt(Utils.nowTimestamp()),
            new MessageDetailUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateMessagesDetail);

        // create AddMessagesDetailContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const messagesDetailRegistered = this.publisher.mergeObjectContext(new AddMessagesDetailContextEvent(aggregateMessagesDetail));
 
        messagesDetailRegistered.created(); // apply event to model events
        messagesDetailRegistered.commit(); // commit all events of model
    }
}