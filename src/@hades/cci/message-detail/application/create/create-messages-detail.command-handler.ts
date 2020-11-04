import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMessagesDetailCommand } from './create-messages-detail.command';
import { CreateMessagesDetailService } from './create-messages-detail.service';
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

@CommandHandler(CreateMessagesDetailCommand)
export class CreateMessagesDetailCommandHandler implements ICommandHandler<CreateMessagesDetailCommand>
{
    constructor(
        private readonly createMessagesDetailService: CreateMessagesDetailService,
    ) {}

    async execute(command: CreateMessagesDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createMessagesDetailService.main(
            command.payload
                .map(messageDetail => {
                    return {
                        id: new MessageDetailId(messageDetail.id),
                        tenantId: new MessageDetailTenantId(messageDetail.tenantId),
                        tenantCode: new MessageDetailTenantCode(messageDetail.tenantCode),
                        systemId: new MessageDetailSystemId(messageDetail.systemId),
                        systemName: new MessageDetailSystemName(messageDetail.systemName),
                        scenario: new MessageDetailScenario(messageDetail.scenario),
                        executionId: new MessageDetailExecutionId(messageDetail.executionId),
                        executionType: new MessageDetailExecutionType(messageDetail.executionType),
                        executionExecutedAt: new MessageDetailExecutionExecutedAt(messageDetail.executionExecutedAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                        executionMonitoringStartAt: new MessageDetailExecutionMonitoringStartAt(messageDetail.executionMonitoringStartAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                        executionMonitoringEndAt: new MessageDetailExecutionMonitoringEndAt(messageDetail.executionMonitoringEndAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                        flowHash: new MessageDetailFlowHash(messageDetail.flowHash),
                        flowParty: new MessageDetailFlowParty(messageDetail.flowParty),
                        flowReceiverParty: new MessageDetailFlowReceiverParty(messageDetail.flowReceiverParty),
                        flowComponent: new MessageDetailFlowComponent(messageDetail.flowComponent),
                        flowReceiverComponent: new MessageDetailFlowReceiverComponent(messageDetail.flowReceiverComponent),
                        flowInterfaceName: new MessageDetailFlowInterfaceName(messageDetail.flowInterfaceName),
                        flowInterfaceNamespace: new MessageDetailFlowInterfaceNamespace(messageDetail.flowInterfaceNamespace),
                        status: new MessageDetailStatus(messageDetail.status),
                        refMessageId: new MessageDetailRefMessageId(messageDetail.refMessageId),
                        detail: new MessageDetailDetail(messageDetail.detail),
                        example: new MessageDetailExample(messageDetail.example),
                        startTimeAt: new MessageDetailStartTimeAt(messageDetail.startTimeAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                        direction: new MessageDetailDirection(messageDetail.direction),
                        errorCategory: new MessageDetailErrorCategory(messageDetail.errorCategory),
                        errorCode: new MessageDetailErrorCode(messageDetail.errorCode),
                        errorLabel: new MessageDetailErrorLabel(messageDetail.errorLabel),
                        node: new MessageDetailNode(messageDetail.node),
                        protocol: new MessageDetailProtocol(messageDetail.protocol),
                        qualityOfService: new MessageDetailQualityOfService(messageDetail.qualityOfService),
                        receiverParty: new MessageDetailReceiverParty(messageDetail.receiverParty),
                        receiverComponent: new MessageDetailReceiverComponent(messageDetail.receiverComponent),
                        receiverInterface: new MessageDetailReceiverInterface(messageDetail.receiverInterface),
                        receiverInterfaceNamespace: new MessageDetailReceiverInterfaceNamespace(messageDetail.receiverInterfaceNamespace),
                        retries: new MessageDetailRetries(messageDetail.retries),
                        size: new MessageDetailSize(messageDetail.size),
                        timesFailed: new MessageDetailTimesFailed(messageDetail.timesFailed),
                        numberMax: new MessageDetailNumberMax(messageDetail.numberMax),
                        numberDays: new MessageDetailNumberDays(messageDetail.numberDays),
                    }
                })
        );
    }
}