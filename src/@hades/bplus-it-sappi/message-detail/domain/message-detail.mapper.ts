import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiMessageDetail } from './message-detail.aggregate';
import { MessageDetailResponse } from './message-detail.response';
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
    
} from './value-objects';

export class MessageDetailMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param messageDetail
     */
    mapObjectToAggregate(messageDetail: ObjectLiteral): BplusItSappiMessageDetail
    {
        return this.makeAggregate(messageDetail);
    }

    /**
     * Map array of objects to array aggregates
     * @param messagesDetail 
     */
    mapObjectsToAggregates(messagesDetail: ObjectLiteral[]): BplusItSappiMessageDetail[]
    {
        return messagesDetail.map(messageDetail  => this.makeAggregate(messageDetail ));
    }

    /**
     * Map aggregate to response
     * @param messageDetail 
     */
    mapAggregateToResponse(messageDetail: BplusItSappiMessageDetail): MessageDetailResponse
    {
        return this.makeResponse(messageDetail);
    }

    /**
     * Map array of aggregates to array responses
     * @param messagesDetail
     */
    mapAggregatesToResponses(messagesDetail: BplusItSappiMessageDetail[]): MessageDetailResponse[]
    {
        return messagesDetail.map(messageDetail => this.makeResponse(messageDetail));
    }

    private makeAggregate(messageDetail: ObjectLiteral): BplusItSappiMessageDetail
    {
        return BplusItSappiMessageDetail.register(
            new MessageDetailId(messageDetail.id),
            new MessageDetailTenantId(messageDetail.tenantId),
            new MessageDetailTenantCode(messageDetail.tenantCode),
            new MessageDetailSystemId(messageDetail.systemId),
            new MessageDetailSystemName(messageDetail.systemName),
            new MessageDetailScenario(messageDetail.scenario),
            new MessageDetailExecutionId(messageDetail.executionId),
            new MessageDetailExecutionType(messageDetail.executionType),
            new MessageDetailExecutionExecutedAt(messageDetail.executionExecutedAt),
            new MessageDetailExecutionMonitoringStartAt(messageDetail.executionMonitoringStartAt),
            new MessageDetailExecutionMonitoringEndAt(messageDetail.executionMonitoringEndAt),
            new MessageDetailFlowId(messageDetail.flowId),
            new MessageDetailFlowParty(messageDetail.flowParty),
            new MessageDetailFlowComponent(messageDetail.flowComponent),
            new MessageDetailFlowInterfaceName(messageDetail.flowInterfaceName),
            new MessageDetailFlowInterfaceNamespace(messageDetail.flowInterfaceNamespace),
            new MessageDetailStatus(messageDetail.status),
            new MessageDetailDetail(messageDetail.detail),
            new MessageDetailExample(messageDetail.example),
            new MessageDetailStartTimeAt(messageDetail.startTimeAt),
            new MessageDetailDirection(messageDetail.direction),
            new MessageDetailErrorCategory(messageDetail.errorCategory),
            new MessageDetailErrorCode(messageDetail.errorCode),
            new MessageDetailErrorLabel(messageDetail.errorLabel),
            new MessageDetailNode(messageDetail.node),
            new MessageDetailProtocol(messageDetail.protocol),
            new MessageDetailQualityOfService(messageDetail.qualityOfService),
            new MessageDetailReceiverParty(messageDetail.receiverParty),
            new MessageDetailReceiverComponent(messageDetail.receiverComponent),
            new MessageDetailReceiverInterface(messageDetail.receiverInterface),
            new MessageDetailReceiverInterfaceNamespace(messageDetail.receiverInterfaceNamespace),
            new MessageDetailRetries(messageDetail.retries),
            new MessageDetailSize(messageDetail.size),
            new MessageDetailTimesFailed(messageDetail.timesFailed),
            new MessageDetailCreatedAt(messageDetail.createdAt),
            new MessageDetailUpdatedAt(messageDetail.updatedAt),
            new MessageDetailDeletedAt(messageDetail.deletedAt),
              
        );
    }

    private makeResponse(messageDetail: BplusItSappiMessageDetail): MessageDetailResponse
    {
        return new MessageDetailResponse(
            messageDetail.id.value,
            messageDetail.tenantId.value,
            messageDetail.tenantCode.value,
            messageDetail.systemId.value,
            messageDetail.systemName.value,
            messageDetail.scenario.value,
            messageDetail.executionId.value,
            messageDetail.executionType.value,
            messageDetail.executionExecutedAt.value,
            messageDetail.executionMonitoringStartAt.value,
            messageDetail.executionMonitoringEndAt.value,
            messageDetail.flowId.value,
            messageDetail.flowParty.value,
            messageDetail.flowComponent.value,
            messageDetail.flowInterfaceName.value,
            messageDetail.flowInterfaceNamespace.value,
            messageDetail.status.value,
            messageDetail.detail.value,
            messageDetail.example.value,
            messageDetail.startTimeAt.value,
            messageDetail.direction.value,
            messageDetail.errorCategory.value,
            messageDetail.errorCode.value,
            messageDetail.errorLabel.value,
            messageDetail.node.value,
            messageDetail.protocol.value,
            messageDetail.qualityOfService.value,
            messageDetail.receiverParty.value,
            messageDetail.receiverComponent.value,
            messageDetail.receiverInterface.value,
            messageDetail.receiverInterfaceNamespace.value,
            messageDetail.retries.value,
            messageDetail.size.value,
            messageDetail.timesFailed.value,
            messageDetail.createdAt.value,
            messageDetail.updatedAt.value,
            messageDetail.deletedAt.value,
            
        );
    }
}