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
    MessageDetailFlowId, 
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

@Injectable()
export class UpdateMessageDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IMessageDetailRepository
    ) {}

    public async main(
        id: MessageDetailId,
        tenantId?: MessageDetailTenantId,
        tenantCode?: MessageDetailTenantCode,
        systemId?: MessageDetailSystemId,
        systemName?: MessageDetailSystemName,
        scenario?: MessageDetailScenario,
        executionId?: MessageDetailExecutionId,
        executionType?: MessageDetailExecutionType,
        executionExecutedAt?: MessageDetailExecutionExecutedAt,
        executionMonitoringStartAt?: MessageDetailExecutionMonitoringStartAt,
        executionMonitoringEndAt?: MessageDetailExecutionMonitoringEndAt,
        flowId?: MessageDetailFlowId,
        flowParty?: MessageDetailFlowParty,
        flowComponent?: MessageDetailFlowComponent,
        flowInterfaceName?: MessageDetailFlowInterfaceName,
        flowInterfaceNamespace?: MessageDetailFlowInterfaceNamespace,
        status?: MessageDetailStatus,
        detail?: MessageDetailDetail,
        example?: MessageDetailExample,
        startTimeAt?: MessageDetailStartTimeAt,
        direction?: MessageDetailDirection,
        errorCategory?: MessageDetailErrorCategory,
        errorCode?: MessageDetailErrorCode,
        errorLabel?: MessageDetailErrorLabel,
        node?: MessageDetailNode,
        protocol?: MessageDetailProtocol,
        qualityOfService?: MessageDetailQualityOfService,
        receiverParty?: MessageDetailReceiverParty,
        receiverComponent?: MessageDetailReceiverComponent,
        receiverInterface?: MessageDetailReceiverInterface,
        receiverInterfaceNamespace?: MessageDetailReceiverInterfaceNamespace,
        retries?: MessageDetailRetries,
        size?: MessageDetailSize,
        timesFailed?: MessageDetailTimesFailed,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const messageDetail = BplusItSappiMessageDetail.register(
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
            flowId,
            flowParty,
            flowComponent,
            flowInterfaceName,
            flowInterfaceNamespace,
            status,
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
            null,
            new MessageDetailUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(messageDetail);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const messageDetailRegister = this.publisher.mergeObjectContext(
            messageDetail
        );
        
        messageDetailRegister.updated(messageDetail); // apply event to model events
        messageDetailRegister.commit(); // commit all events of model
    }
}