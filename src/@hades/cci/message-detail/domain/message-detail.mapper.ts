import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { CciMessageDetail } from './message-detail.aggregate';
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
import { TenantMapper } from '@hades/iam/tenant/domain/tenant.mapper';
import { SystemMapper } from '@hades/cci/system/domain/system.mapper';
import { ExecutionMapper } from '@hades/cci/execution/domain/execution.mapper';

export class MessageDetailMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param messageDetail
     */
    mapModelToAggregate(messageDetail: ObjectLiteral, cQMetadata?: CQMetadata): CciMessageDetail
    {
        if (!messageDetail) return;

        return this.makeAggregate(messageDetail, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param messagesDetail
     */
    mapModelsToAggregates(messagesDetail: ObjectLiteral[], cQMetadata?: CQMetadata): CciMessageDetail[]
    {
        if (!Array.isArray(messagesDetail)) return;

        return messagesDetail.map(messageDetail  => this.makeAggregate(messageDetail, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param messageDetail
     */
    mapAggregateToResponse(messageDetail: CciMessageDetail): MessageDetailResponse
    {
        return this.makeResponse(messageDetail);
    }

    /**
     * Map array of aggregates to array responses
     * @param messagesDetail
     */
    mapAggregatesToResponses(messagesDetail: CciMessageDetail[]): MessageDetailResponse[]
    {
        if (!Array.isArray(messagesDetail)) return;

        return messagesDetail.map(messageDetail => this.makeResponse(messageDetail));
    }

    private makeAggregate(messageDetail: ObjectLiteral, cQMetadata?: CQMetadata): CciMessageDetail
    {
        return CciMessageDetail.register(
            new MessageDetailId(messageDetail.id),
            new MessageDetailTenantId(messageDetail.tenantId),
            new MessageDetailTenantCode(messageDetail.tenantCode),
            new MessageDetailSystemId(messageDetail.systemId),
            new MessageDetailSystemName(messageDetail.systemName),
            new MessageDetailScenario(messageDetail.scenario),
            new MessageDetailExecutionId(messageDetail.executionId),
            new MessageDetailExecutionType(messageDetail.executionType),
            new MessageDetailExecutionExecutedAt(messageDetail.executionExecutedAt, {}, {addTimezone: cQMetadata.timezone}),
            new MessageDetailExecutionMonitoringStartAt(messageDetail.executionMonitoringStartAt, {}, {addTimezone: cQMetadata.timezone}),
            new MessageDetailExecutionMonitoringEndAt(messageDetail.executionMonitoringEndAt, {}, {addTimezone: cQMetadata.timezone}),
            new MessageDetailFlowHash(messageDetail.flowHash),
            new MessageDetailFlowParty(messageDetail.flowParty),
            new MessageDetailFlowReceiverParty(messageDetail.flowReceiverParty),
            new MessageDetailFlowComponent(messageDetail.flowComponent),
            new MessageDetailFlowReceiverComponent(messageDetail.flowReceiverComponent),
            new MessageDetailFlowInterfaceName(messageDetail.flowInterfaceName),
            new MessageDetailFlowInterfaceNamespace(messageDetail.flowInterfaceNamespace),
            new MessageDetailStatus(messageDetail.status),
            new MessageDetailRefMessageId(messageDetail.refMessageId),
            new MessageDetailDetail(messageDetail.detail),
            new MessageDetailExample(messageDetail.example),
            new MessageDetailStartTimeAt(messageDetail.startTimeAt, {}, {addTimezone: cQMetadata.timezone}),
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
            new MessageDetailNumberMax(messageDetail.numberMax),
            new MessageDetailNumberDays(messageDetail.numberDays),
            new MessageDetailCreatedAt(messageDetail.createdAt, {}, {addTimezone: cQMetadata.timezone}),
            new MessageDetailUpdatedAt(messageDetail.updatedAt, {}, {addTimezone: cQMetadata.timezone}),
            new MessageDetailDeletedAt(messageDetail.deletedAt, {}, {addTimezone: cQMetadata.timezone}),
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapModelToAggregate(messageDetail.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapModelToAggregate(messageDetail.system) : undefined,
            this.options.eagerLoading ? new ExecutionMapper({ eagerLoading: false }).mapModelToAggregate(messageDetail.execution) : undefined,
        );
    }

    private makeResponse(messageDetail: CciMessageDetail): MessageDetailResponse
    {
        if (!messageDetail) return;

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
            messageDetail.flowHash.value,
            messageDetail.flowParty.value,
            messageDetail.flowReceiverParty.value,
            messageDetail.flowComponent.value,
            messageDetail.flowReceiverComponent.value,
            messageDetail.flowInterfaceName.value,
            messageDetail.flowInterfaceNamespace.value,
            messageDetail.status.value,
            messageDetail.refMessageId.value,
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
            messageDetail.numberMax.value,
            messageDetail.numberDays.value,
            messageDetail.createdAt.value,
            messageDetail.updatedAt.value,
            messageDetail.deletedAt.value,
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapAggregateToResponse(messageDetail.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapAggregateToResponse(messageDetail.system) : undefined,
            this.options.eagerLoading ? new ExecutionMapper({ eagerLoading: false }).mapAggregateToResponse(messageDetail.execution) : undefined,
        );
    }
}