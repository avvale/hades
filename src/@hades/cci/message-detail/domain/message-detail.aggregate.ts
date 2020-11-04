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
} from './value-objects';
import { CreatedMessageDetailEvent } from './../application/events/created-message-detail.event';
import { UpdatedMessageDetailEvent } from './../application/events/updated-message-detail.event';
import { DeletedMessageDetailEvent } from './../application/events/deleted-message-detail.event';

import { IamTenant } from '@hades/iam/tenant/domain/tenant.aggregate';
import { CciSystem } from '@hades/cci/system/domain/system.aggregate';
import { CciExecution } from '@hades/cci/execution/domain/execution.aggregate';



export class CciMessageDetail extends AggregateRoot
{
    id: MessageDetailId;
    tenantId: MessageDetailTenantId;
    tenantCode: MessageDetailTenantCode;
    systemId: MessageDetailSystemId;
    systemName: MessageDetailSystemName;
    scenario: MessageDetailScenario;
    executionId: MessageDetailExecutionId;
    executionType: MessageDetailExecutionType;
    executionExecutedAt: MessageDetailExecutionExecutedAt;
    executionMonitoringStartAt: MessageDetailExecutionMonitoringStartAt;
    executionMonitoringEndAt: MessageDetailExecutionMonitoringEndAt;
    flowHash: MessageDetailFlowHash;
    flowParty: MessageDetailFlowParty;
    flowReceiverParty: MessageDetailFlowReceiverParty;
    flowComponent: MessageDetailFlowComponent;
    flowReceiverComponent: MessageDetailFlowReceiverComponent;
    flowInterfaceName: MessageDetailFlowInterfaceName;
    flowInterfaceNamespace: MessageDetailFlowInterfaceNamespace;
    status: MessageDetailStatus;
    refMessageId: MessageDetailRefMessageId;
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
    numberMax: MessageDetailNumberMax;
    numberDays: MessageDetailNumberDays;
    createdAt: MessageDetailCreatedAt;
    updatedAt: MessageDetailUpdatedAt;
    deletedAt: MessageDetailDeletedAt;
    
    // eager relationship
    
    
    tenant: IamTenant;
    system: CciSystem;
    execution: CciExecution;
    
    
    
    constructor(id?: MessageDetailId, tenantId?: MessageDetailTenantId, tenantCode?: MessageDetailTenantCode, systemId?: MessageDetailSystemId, systemName?: MessageDetailSystemName, scenario?: MessageDetailScenario, executionId?: MessageDetailExecutionId, executionType?: MessageDetailExecutionType, executionExecutedAt?: MessageDetailExecutionExecutedAt, executionMonitoringStartAt?: MessageDetailExecutionMonitoringStartAt, executionMonitoringEndAt?: MessageDetailExecutionMonitoringEndAt, flowHash?: MessageDetailFlowHash, flowParty?: MessageDetailFlowParty, flowReceiverParty?: MessageDetailFlowReceiverParty, flowComponent?: MessageDetailFlowComponent, flowReceiverComponent?: MessageDetailFlowReceiverComponent, flowInterfaceName?: MessageDetailFlowInterfaceName, flowInterfaceNamespace?: MessageDetailFlowInterfaceNamespace, status?: MessageDetailStatus, refMessageId?: MessageDetailRefMessageId, detail?: MessageDetailDetail, example?: MessageDetailExample, startTimeAt?: MessageDetailStartTimeAt, direction?: MessageDetailDirection, errorCategory?: MessageDetailErrorCategory, errorCode?: MessageDetailErrorCode, errorLabel?: MessageDetailErrorLabel, node?: MessageDetailNode, protocol?: MessageDetailProtocol, qualityOfService?: MessageDetailQualityOfService, receiverParty?: MessageDetailReceiverParty, receiverComponent?: MessageDetailReceiverComponent, receiverInterface?: MessageDetailReceiverInterface, receiverInterfaceNamespace?: MessageDetailReceiverInterfaceNamespace, retries?: MessageDetailRetries, size?: MessageDetailSize, timesFailed?: MessageDetailTimesFailed, numberMax?: MessageDetailNumberMax, numberDays?: MessageDetailNumberDays, createdAt?: MessageDetailCreatedAt, updatedAt?: MessageDetailUpdatedAt, deletedAt?: MessageDetailDeletedAt, tenant?: IamTenant, system?: CciSystem, execution?: CciExecution, )
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
        this.flowReceiverParty = flowReceiverParty;
        this.flowComponent = flowComponent;
        this.flowReceiverComponent = flowReceiverComponent;
        this.flowInterfaceName = flowInterfaceName;
        this.flowInterfaceNamespace = flowInterfaceNamespace;
        this.status = status;
        this.refMessageId = refMessageId;
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
        this.numberMax = numberMax;
        this.numberDays = numberDays;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
        // eager relationship
        
        
        this.tenant = tenant;
        this.system = system;
        this.execution = execution;
        
        
        
    }

    static register (id: MessageDetailId, tenantId: MessageDetailTenantId, tenantCode: MessageDetailTenantCode, systemId: MessageDetailSystemId, systemName: MessageDetailSystemName, scenario: MessageDetailScenario, executionId: MessageDetailExecutionId, executionType: MessageDetailExecutionType, executionExecutedAt: MessageDetailExecutionExecutedAt, executionMonitoringStartAt: MessageDetailExecutionMonitoringStartAt, executionMonitoringEndAt: MessageDetailExecutionMonitoringEndAt, flowHash: MessageDetailFlowHash, flowParty: MessageDetailFlowParty, flowReceiverParty: MessageDetailFlowReceiverParty, flowComponent: MessageDetailFlowComponent, flowReceiverComponent: MessageDetailFlowReceiverComponent, flowInterfaceName: MessageDetailFlowInterfaceName, flowInterfaceNamespace: MessageDetailFlowInterfaceNamespace, status: MessageDetailStatus, refMessageId: MessageDetailRefMessageId, detail: MessageDetailDetail, example: MessageDetailExample, startTimeAt: MessageDetailStartTimeAt, direction: MessageDetailDirection, errorCategory: MessageDetailErrorCategory, errorCode: MessageDetailErrorCode, errorLabel: MessageDetailErrorLabel, node: MessageDetailNode, protocol: MessageDetailProtocol, qualityOfService: MessageDetailQualityOfService, receiverParty: MessageDetailReceiverParty, receiverComponent: MessageDetailReceiverComponent, receiverInterface: MessageDetailReceiverInterface, receiverInterfaceNamespace: MessageDetailReceiverInterfaceNamespace, retries: MessageDetailRetries, size: MessageDetailSize, timesFailed: MessageDetailTimesFailed, numberMax: MessageDetailNumberMax, numberDays: MessageDetailNumberDays, createdAt: MessageDetailCreatedAt, updatedAt: MessageDetailUpdatedAt, deletedAt: MessageDetailDeletedAt, tenant?: IamTenant, system?: CciSystem, execution?: CciExecution, ): CciMessageDetail
    {
        return new CciMessageDetail(id, tenantId, tenantCode, systemId, systemName, scenario, executionId, executionType, executionExecutedAt, executionMonitoringStartAt, executionMonitoringEndAt, flowHash, flowParty, flowReceiverParty, flowComponent, flowReceiverComponent, flowInterfaceName, flowInterfaceNamespace, status, refMessageId, detail, example, startTimeAt, direction, errorCategory, errorCode, errorLabel, node, protocol, qualityOfService, receiverParty, receiverComponent, receiverInterface, receiverInterfaceNamespace, retries, size, timesFailed, numberMax, numberDays, createdAt, updatedAt, deletedAt, tenant, system, execution, );
    }

    created(messageDetail: CciMessageDetail): void
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
                messageDetail.flowReceiverParty?.value,
                messageDetail.flowComponent.value,
                messageDetail.flowReceiverComponent?.value,
                messageDetail.flowInterfaceName.value,
                messageDetail.flowInterfaceNamespace.value,
                messageDetail.status.value,
                messageDetail.refMessageId?.value,
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
                messageDetail.numberMax?.value,
                messageDetail.numberDays?.value,
                messageDetail.createdAt?.value,
                messageDetail.updatedAt?.value,
                messageDetail.deletedAt?.value,
                
            )
        );
    }

    updated(messageDetail: CciMessageDetail): void
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
                messageDetail.flowReceiverParty?.value,
                messageDetail.flowComponent?.value,
                messageDetail.flowReceiverComponent?.value,
                messageDetail.flowInterfaceName?.value,
                messageDetail.flowInterfaceNamespace?.value,
                messageDetail.status?.value,
                messageDetail.refMessageId?.value,
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
                messageDetail.numberMax?.value,
                messageDetail.numberDays?.value,
                messageDetail.createdAt?.value,
                messageDetail.updatedAt?.value,
                messageDetail.deletedAt?.value,
                
            )
        );
    }

    deleted(messageDetail: CciMessageDetail): void
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
                messageDetail.flowReceiverParty?.value,
                messageDetail.flowComponent.value,
                messageDetail.flowReceiverComponent?.value,
                messageDetail.flowInterfaceName.value,
                messageDetail.flowInterfaceNamespace.value,
                messageDetail.status.value,
                messageDetail.refMessageId?.value,
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
                messageDetail.numberMax?.value,
                messageDetail.numberDays?.value,
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
            flowReceiverParty: this.flowReceiverParty?.value,
            flowComponent: this.flowComponent.value,
            flowReceiverComponent: this.flowReceiverComponent?.value,
            flowInterfaceName: this.flowInterfaceName.value,
            flowInterfaceNamespace: this.flowInterfaceNamespace.value,
            status: this.status.value,
            refMessageId: this.refMessageId?.value,
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
            numberMax: this.numberMax?.value,
            numberDays: this.numberDays?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
            // eager relationship
            
            
            tenant: this.tenant?.toDTO(),
            system: this.system?.toDTO(),
            execution: this.execution?.toDTO(),
            
            
            
        }
    }
}
