import { AggregateRoot } from '@nestjs/cqrs';
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
    
} from './value-objects';
import { CreatedMessageDetailEvent } from './../application/events/created-message-detail.event';
import { UpdatedMessageDetailEvent } from './../application/events/updated-message-detail.event';
import { DeletedMessageDetailEvent } from './../application/events/deleted-message-detail.event';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.aggregate';
import { BplusItSappiSystem } from '@hades/bplus-it-sappi/system/domain/system.aggregate';
import { BplusItSappiExecution } from '@hades/bplus-it-sappi/execution/domain/execution.aggregate';
import { BplusItSappiFlow } from '@hades/bplus-it-sappi/flow/domain/flow.aggregate';

export class BplusItSappiMessageDetail extends AggregateRoot
{
    id: MessageDetailId;
    tenantId: MessageDetailTenantId;
    tenant: AdminTenant;
    tenantCode: MessageDetailTenantCode;
    systemId: MessageDetailSystemId;
    system: BplusItSappiSystem;
    systemName: MessageDetailSystemName;
    scenario: MessageDetailScenario;
    executionId: MessageDetailExecutionId;
    execution: BplusItSappiExecution;
    executionType: MessageDetailExecutionType;
    executionExecutedAt: MessageDetailExecutionExecutedAt;
    executionMonitoringStartAt: MessageDetailExecutionMonitoringStartAt;
    executionMonitoringEndAt: MessageDetailExecutionMonitoringEndAt;
    flowHash: MessageDetailFlowHash;
    flow: BplusItSappiFlow;
    flowParty: MessageDetailFlowParty;
    flowComponent: MessageDetailFlowComponent;
    flowInterfaceName: MessageDetailFlowInterfaceName;
    flowInterfaceNamespace: MessageDetailFlowInterfaceNamespace;
    status: MessageDetailStatus;
    detail: MessageDetailDetail;
    example: MessageDetailExample;
    startTimeAt: MessageDetailStartTimeAt;
    direction: MessageDetailDirection;
    errorCategory: MessageDetailErrorCategory;
    errorCode: MessageDetailErrorCode;
    errorLabel: MessageDetailErrorLabel;
    node: MessageDetailNode;
    protocol: MessageDetailProtocol;
    qualityOfService: MessageDetailQualityOfService;
    receiverParty: MessageDetailReceiverParty;
    receiverComponent: MessageDetailReceiverComponent;
    receiverInterface: MessageDetailReceiverInterface;
    receiverInterfaceNamespace: MessageDetailReceiverInterfaceNamespace;
    retries: MessageDetailRetries;
    size: MessageDetailSize;
    timesFailed: MessageDetailTimesFailed;
    createdAt: MessageDetailCreatedAt;
    updatedAt: MessageDetailUpdatedAt;
    deletedAt: MessageDetailDeletedAt;
    
    constructor(id?: MessageDetailId, tenantId?: MessageDetailTenantId, tenantCode?: MessageDetailTenantCode, systemId?: MessageDetailSystemId, systemName?: MessageDetailSystemName, scenario?: MessageDetailScenario, executionId?: MessageDetailExecutionId, executionType?: MessageDetailExecutionType, executionExecutedAt?: MessageDetailExecutionExecutedAt, executionMonitoringStartAt?: MessageDetailExecutionMonitoringStartAt, executionMonitoringEndAt?: MessageDetailExecutionMonitoringEndAt, flowHash?: MessageDetailFlowHash, flowParty?: MessageDetailFlowParty, flowComponent?: MessageDetailFlowComponent, flowInterfaceName?: MessageDetailFlowInterfaceName, flowInterfaceNamespace?: MessageDetailFlowInterfaceNamespace, status?: MessageDetailStatus, detail?: MessageDetailDetail, example?: MessageDetailExample, startTimeAt?: MessageDetailStartTimeAt, direction?: MessageDetailDirection, errorCategory?: MessageDetailErrorCategory, errorCode?: MessageDetailErrorCode, errorLabel?: MessageDetailErrorLabel, node?: MessageDetailNode, protocol?: MessageDetailProtocol, qualityOfService?: MessageDetailQualityOfService, receiverParty?: MessageDetailReceiverParty, receiverComponent?: MessageDetailReceiverComponent, receiverInterface?: MessageDetailReceiverInterface, receiverInterfaceNamespace?: MessageDetailReceiverInterfaceNamespace, retries?: MessageDetailRetries, size?: MessageDetailSize, timesFailed?: MessageDetailTimesFailed, createdAt?: MessageDetailCreatedAt, updatedAt?: MessageDetailUpdatedAt, deletedAt?: MessageDetailDeletedAt, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.tenantCode = tenantCode;
        this.systemId = systemId;
        this.systemName = systemName;
        this.scenario = scenario;
        this.executionId = executionId;
        this.executionType = executionType;
        this.executionExecutedAt = executionExecutedAt;
        this.executionMonitoringStartAt = executionMonitoringStartAt;
        this.executionMonitoringEndAt = executionMonitoringEndAt;
        this.flowHash = flowHash;
        this.flowParty = flowParty;
        this.flowComponent = flowComponent;
        this.flowInterfaceName = flowInterfaceName;
        this.flowInterfaceNamespace = flowInterfaceNamespace;
        this.status = status;
        this.detail = detail;
        this.example = example;
        this.startTimeAt = startTimeAt;
        this.direction = direction;
        this.errorCategory = errorCategory;
        this.errorCode = errorCode;
        this.errorLabel = errorLabel;
        this.node = node;
        this.protocol = protocol;
        this.qualityOfService = qualityOfService;
        this.receiverParty = receiverParty;
        this.receiverComponent = receiverComponent;
        this.receiverInterface = receiverInterface;
        this.receiverInterfaceNamespace = receiverInterfaceNamespace;
        this.retries = retries;
        this.size = size;
        this.timesFailed = timesFailed;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: MessageDetailId, tenantId: MessageDetailTenantId, tenantCode: MessageDetailTenantCode, systemId: MessageDetailSystemId, systemName: MessageDetailSystemName, scenario: MessageDetailScenario, executionId: MessageDetailExecutionId, executionType: MessageDetailExecutionType, executionExecutedAt: MessageDetailExecutionExecutedAt, executionMonitoringStartAt: MessageDetailExecutionMonitoringStartAt, executionMonitoringEndAt: MessageDetailExecutionMonitoringEndAt, flowHash: MessageDetailFlowHash, flowParty: MessageDetailFlowParty, flowComponent: MessageDetailFlowComponent, flowInterfaceName: MessageDetailFlowInterfaceName, flowInterfaceNamespace: MessageDetailFlowInterfaceNamespace, status: MessageDetailStatus, detail: MessageDetailDetail, example: MessageDetailExample, startTimeAt: MessageDetailStartTimeAt, direction: MessageDetailDirection, errorCategory: MessageDetailErrorCategory, errorCode: MessageDetailErrorCode, errorLabel: MessageDetailErrorLabel, node: MessageDetailNode, protocol: MessageDetailProtocol, qualityOfService: MessageDetailQualityOfService, receiverParty: MessageDetailReceiverParty, receiverComponent: MessageDetailReceiverComponent, receiverInterface: MessageDetailReceiverInterface, receiverInterfaceNamespace: MessageDetailReceiverInterfaceNamespace, retries: MessageDetailRetries, size: MessageDetailSize, timesFailed: MessageDetailTimesFailed, createdAt: MessageDetailCreatedAt, updatedAt: MessageDetailUpdatedAt, deletedAt: MessageDetailDeletedAt, ): BplusItSappiMessageDetail
    {
        return new BplusItSappiMessageDetail(id, tenantId, tenantCode, systemId, systemName, scenario, executionId, executionType, executionExecutedAt, executionMonitoringStartAt, executionMonitoringEndAt, flowHash, flowParty, flowComponent, flowInterfaceName, flowInterfaceNamespace, status, detail, example, startTimeAt, direction, errorCategory, errorCode, errorLabel, node, protocol, qualityOfService, receiverParty, receiverComponent, receiverInterface, receiverInterfaceNamespace, retries, size, timesFailed, createdAt, updatedAt, deletedAt, );
    }

    created(messageDetail: BplusItSappiMessageDetail): void
    {
        this.apply(
            new CreatedMessageDetailEvent(
                messageDetail.id.value,
                messageDetail.tenantId.value,
                messageDetail.tenantCode.value,
                messageDetail.systemId.value,
                messageDetail.systemName.value,
                messageDetail.scenario?.value,
                messageDetail.executionId.value,
                messageDetail.executionType.value,
                messageDetail.executionExecutedAt.value,
                messageDetail.executionMonitoringStartAt.value,
                messageDetail.executionMonitoringEndAt.value,
                messageDetail.flowHash.value,
                messageDetail.flowParty?.value,
                messageDetail.flowComponent.value,
                messageDetail.flowInterfaceName.value,
                messageDetail.flowInterfaceNamespace.value,
                messageDetail.status.value,
                messageDetail.detail?.value,
                messageDetail.example?.value,
                messageDetail.startTimeAt?.value,
                messageDetail.direction.value,
                messageDetail.errorCategory?.value,
                messageDetail.errorCode?.value,
                messageDetail.errorLabel?.value,
                messageDetail.node?.value,
                messageDetail.protocol?.value,
                messageDetail.qualityOfService?.value,
                messageDetail.receiverParty?.value,
                messageDetail.receiverComponent?.value,
                messageDetail.receiverInterface?.value,
                messageDetail.receiverInterfaceNamespace?.value,
                messageDetail.retries?.value,
                messageDetail.size?.value,
                messageDetail.timesFailed?.value,
                messageDetail.createdAt?.value,
                messageDetail.updatedAt?.value,
                messageDetail.deletedAt?.value,
                
            )
        );
    }

    updated(messageDetail: BplusItSappiMessageDetail): void
    {
        this.apply(
            new UpdatedMessageDetailEvent(
                messageDetail.id.value,
                messageDetail.tenantId?.value,
                messageDetail.tenantCode?.value,
                messageDetail.systemId?.value,
                messageDetail.systemName?.value,
                messageDetail.scenario?.value,
                messageDetail.executionId?.value,
                messageDetail.executionType?.value,
                messageDetail.executionExecutedAt?.value,
                messageDetail.executionMonitoringStartAt?.value,
                messageDetail.executionMonitoringEndAt?.value,
                messageDetail.flowHash?.value,
                messageDetail.flowParty?.value,
                messageDetail.flowComponent?.value,
                messageDetail.flowInterfaceName?.value,
                messageDetail.flowInterfaceNamespace?.value,
                messageDetail.status?.value,
                messageDetail.detail?.value,
                messageDetail.example?.value,
                messageDetail.startTimeAt?.value,
                messageDetail.direction?.value,
                messageDetail.errorCategory?.value,
                messageDetail.errorCode?.value,
                messageDetail.errorLabel?.value,
                messageDetail.node?.value,
                messageDetail.protocol?.value,
                messageDetail.qualityOfService?.value,
                messageDetail.receiverParty?.value,
                messageDetail.receiverComponent?.value,
                messageDetail.receiverInterface?.value,
                messageDetail.receiverInterfaceNamespace?.value,
                messageDetail.retries?.value,
                messageDetail.size?.value,
                messageDetail.timesFailed?.value,
                messageDetail.createdAt?.value,
                messageDetail.updatedAt?.value,
                messageDetail.deletedAt?.value,
                
            )
        );
    }

    deleted(messageDetail: BplusItSappiMessageDetail): void
    {
        this.apply(
            new DeletedMessageDetailEvent(
                messageDetail.id.value,
                messageDetail.tenantId.value,
                messageDetail.tenantCode.value,
                messageDetail.systemId.value,
                messageDetail.systemName.value,
                messageDetail.scenario?.value,
                messageDetail.executionId.value,
                messageDetail.executionType.value,
                messageDetail.executionExecutedAt.value,
                messageDetail.executionMonitoringStartAt.value,
                messageDetail.executionMonitoringEndAt.value,
                messageDetail.flowHash.value,
                messageDetail.flowParty?.value,
                messageDetail.flowComponent.value,
                messageDetail.flowInterfaceName.value,
                messageDetail.flowInterfaceNamespace.value,
                messageDetail.status.value,
                messageDetail.detail?.value,
                messageDetail.example?.value,
                messageDetail.startTimeAt?.value,
                messageDetail.direction.value,
                messageDetail.errorCategory?.value,
                messageDetail.errorCode?.value,
                messageDetail.errorLabel?.value,
                messageDetail.node?.value,
                messageDetail.protocol?.value,
                messageDetail.qualityOfService?.value,
                messageDetail.receiverParty?.value,
                messageDetail.receiverComponent?.value,
                messageDetail.receiverInterface?.value,
                messageDetail.receiverInterfaceNamespace?.value,
                messageDetail.retries?.value,
                messageDetail.size?.value,
                messageDetail.timesFailed?.value,
                messageDetail.createdAt?.value,
                messageDetail.updatedAt?.value,
                messageDetail.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            tenantId: this.tenantId.value,
            tenantCode: this.tenantCode.value,
            systemId: this.systemId.value,
            systemName: this.systemName.value,
            scenario: this.scenario?.value,
            executionId: this.executionId.value,
            executionType: this.executionType.value,
            executionExecutedAt: this.executionExecutedAt.value,
            executionMonitoringStartAt: this.executionMonitoringStartAt.value,
            executionMonitoringEndAt: this.executionMonitoringEndAt.value,
            flowHash: this.flowHash.value,
            flowParty: this.flowParty?.value,
            flowComponent: this.flowComponent.value,
            flowInterfaceName: this.flowInterfaceName.value,
            flowInterfaceNamespace: this.flowInterfaceNamespace.value,
            status: this.status.value,
            detail: this.detail?.value,
            example: this.example?.value,
            startTimeAt: this.startTimeAt?.value,
            direction: this.direction.value,
            errorCategory: this.errorCategory?.value,
            errorCode: this.errorCode?.value,
            errorLabel: this.errorLabel?.value,
            node: this.node?.value,
            protocol: this.protocol?.value,
            qualityOfService: this.qualityOfService?.value,
            receiverParty: this.receiverParty?.value,
            receiverComponent: this.receiverComponent?.value,
            receiverInterface: this.receiverInterface?.value,
            receiverInterfaceNamespace: this.receiverInterfaceNamespace?.value,
            retries: this.retries?.value,
            size: this.size?.value,
            timesFailed: this.timesFailed?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
