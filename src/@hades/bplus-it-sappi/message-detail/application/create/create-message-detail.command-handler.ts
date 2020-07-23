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
    MessageDetailTimesFailed
    
} from './../../domain/value-objects';

@CommandHandler(CreateMessageDetailCommand)
export class CreateMessageDetailCommandHandler implements ICommandHandler<CreateMessageDetailCommand>
{
    constructor(
        private readonly createMessageDetailService: CreateMessageDetailService
    ) { }

    async execute(command: CreateMessageDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createMessageDetailService.main(
            new MessageDetailId(command.id),
            new MessageDetailTenantId(command.tenantId),
            new MessageDetailTenantCode(command.tenantCode),
            new MessageDetailSystemId(command.systemId),
            new MessageDetailSystemName(command.systemName),
            new MessageDetailScenario(command.scenario),
            new MessageDetailExecutionId(command.executionId),
            new MessageDetailExecutionType(command.executionType),
            new MessageDetailExecutionExecutedAt(command.executionExecutedAt),
            new MessageDetailExecutionMonitoringStartAt(command.executionMonitoringStartAt),
            new MessageDetailExecutionMonitoringEndAt(command.executionMonitoringEndAt),
            new MessageDetailFlowId(command.flowId),
            new MessageDetailFlowParty(command.flowParty),
            new MessageDetailFlowComponent(command.flowComponent),
            new MessageDetailFlowInterfaceName(command.flowInterfaceName),
            new MessageDetailFlowInterfaceNamespace(command.flowInterfaceNamespace),
            new MessageDetailStatus(command.status),
            new MessageDetailDetail(command.detail),
            new MessageDetailExample(command.example),
            new MessageDetailStartTimeAt(command.startTimeAt),
            new MessageDetailDirection(command.direction),
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
            
        );
    }
}