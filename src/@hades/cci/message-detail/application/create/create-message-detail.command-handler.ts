import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMessageDetailCommand } from './create-message-detail.command';
import { CreateMessageDetailService } from './create-message-detail.service';
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

@CommandHandler(CreateMessageDetailCommand)
export class CreateMessageDetailCommandHandler implements ICommandHandler<CreateMessageDetailCommand>
{
    constructor(
        private readonly createMessageDetailService: CreateMessageDetailService,
    ) {}

    async execute(command: CreateMessageDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createMessageDetailService.main(
            {
                id: new MessageDetailId(command.payload.id),
                tenantId: new MessageDetailTenantId(command.payload.tenantId),
                tenantCode: new MessageDetailTenantCode(command.payload.tenantCode),
                systemId: new MessageDetailSystemId(command.payload.systemId),
                systemName: new MessageDetailSystemName(command.payload.systemName),
                scenario: new MessageDetailScenario(command.payload.scenario),
                executionId: new MessageDetailExecutionId(command.payload.executionId),
                executionType: new MessageDetailExecutionType(command.payload.executionType),
                executionExecutedAt: new MessageDetailExecutionExecutedAt(command.payload.executionExecutedAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringStartAt: new MessageDetailExecutionMonitoringStartAt(command.payload.executionMonitoringStartAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringEndAt: new MessageDetailExecutionMonitoringEndAt(command.payload.executionMonitoringEndAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                flowHash: new MessageDetailFlowHash(command.payload.flowHash),
                flowParty: new MessageDetailFlowParty(command.payload.flowParty),
                flowReceiverParty: new MessageDetailFlowReceiverParty(command.payload.flowReceiverParty),
                flowComponent: new MessageDetailFlowComponent(command.payload.flowComponent),
                flowReceiverComponent: new MessageDetailFlowReceiverComponent(command.payload.flowReceiverComponent),
                flowInterfaceName: new MessageDetailFlowInterfaceName(command.payload.flowInterfaceName),
                flowInterfaceNamespace: new MessageDetailFlowInterfaceNamespace(command.payload.flowInterfaceNamespace),
                status: new MessageDetailStatus(command.payload.status),
                refMessageId: new MessageDetailRefMessageId(command.payload.refMessageId),
                detail: new MessageDetailDetail(command.payload.detail),
                example: new MessageDetailExample(command.payload.example),
                startTimeAt: new MessageDetailStartTimeAt(command.payload.startTimeAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                direction: new MessageDetailDirection(command.payload.direction),
                errorCategory: new MessageDetailErrorCategory(command.payload.errorCategory),
                errorCode: new MessageDetailErrorCode(command.payload.errorCode),
                errorLabel: new MessageDetailErrorLabel(command.payload.errorLabel),
                node: new MessageDetailNode(command.payload.node),
                protocol: new MessageDetailProtocol(command.payload.protocol),
                qualityOfService: new MessageDetailQualityOfService(command.payload.qualityOfService),
                receiverParty: new MessageDetailReceiverParty(command.payload.receiverParty),
                receiverComponent: new MessageDetailReceiverComponent(command.payload.receiverComponent),
                receiverInterface: new MessageDetailReceiverInterface(command.payload.receiverInterface),
                receiverInterfaceNamespace: new MessageDetailReceiverInterfaceNamespace(command.payload.receiverInterfaceNamespace),
                retries: new MessageDetailRetries(command.payload.retries),
                size: new MessageDetailSize(command.payload.size),
                timesFailed: new MessageDetailTimesFailed(command.payload.timesFailed),
                numberMax: new MessageDetailNumberMax(command.payload.numberMax),
                numberDays: new MessageDetailNumberDays(command.payload.numberDays),
            }
        );
    }
}