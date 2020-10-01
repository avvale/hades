import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMessageDetailCommand } from './update-message-detail.command';
import { UpdateMessageDetailService } from './update-message-detail.service';
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
    MessageDetailNumberDays
    
} from './../../domain/value-objects';

@CommandHandler(UpdateMessageDetailCommand)
export class UpdateMessageDetailCommandHandler implements ICommandHandler<UpdateMessageDetailCommand>
{
    constructor(
        private readonly updateMessageDetailService: UpdateMessageDetailService
    ) { }

    async execute(command: UpdateMessageDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateMessageDetailService.main(
            new MessageDetailId(command.id),
            new MessageDetailTenantId(command.tenantId, { undefinable: true }),
            new MessageDetailTenantCode(command.tenantCode, { undefinable: true }),
            new MessageDetailSystemId(command.systemId, { undefinable: true }),
            new MessageDetailSystemName(command.systemName, { undefinable: true }),
            new MessageDetailScenario(command.scenario),
            new MessageDetailExecutionId(command.executionId, { undefinable: true }),
            new MessageDetailExecutionType(command.executionType, { undefinable: true }),
            new MessageDetailExecutionExecutedAt(command.executionExecutedAt, { undefinable: true }),
            new MessageDetailExecutionMonitoringStartAt(command.executionMonitoringStartAt, { undefinable: true }),
            new MessageDetailExecutionMonitoringEndAt(command.executionMonitoringEndAt, { undefinable: true }),
            new MessageDetailFlowHash(command.flowHash, { undefinable: true }),
            new MessageDetailFlowParty(command.flowParty),
            new MessageDetailFlowReceiverParty(command.flowReceiverParty),
            new MessageDetailFlowComponent(command.flowComponent, { undefinable: true }),
            new MessageDetailFlowReceiverComponent(command.flowReceiverComponent),
            new MessageDetailFlowInterfaceName(command.flowInterfaceName, { undefinable: true }),
            new MessageDetailFlowInterfaceNamespace(command.flowInterfaceNamespace, { undefinable: true }),
            new MessageDetailStatus(command.status, { undefinable: true }),
            new MessageDetailRefMessageId(command.refMessageId),
            new MessageDetailDetail(command.detail),
            new MessageDetailExample(command.example),
            new MessageDetailStartTimeAt(command.startTimeAt),
            new MessageDetailDirection(command.direction, { undefinable: true }),
            new MessageDetailErrorCategory(command.errorCategory),
            new MessageDetailErrorCode(command.errorCode),
            new MessageDetailErrorLabel(command.errorLabel),
            new MessageDetailNode(command.node),
            new MessageDetailProtocol(command.protocol),
            new MessageDetailQualityOfService(command.qualityOfService),
            new MessageDetailReceiverParty(command.receiverParty),
            new MessageDetailReceiverComponent(command.receiverComponent),
            new MessageDetailReceiverInterface(command.receiverInterface),
            new MessageDetailReceiverInterfaceNamespace(command.receiverInterfaceNamespace),
            new MessageDetailRetries(command.retries),
            new MessageDetailSize(command.size),
            new MessageDetailTimesFailed(command.timesFailed),
            new MessageDetailNumberMax(command.numberMax),
            new MessageDetailNumberDays(command.numberDays),
            
        )
    }
}