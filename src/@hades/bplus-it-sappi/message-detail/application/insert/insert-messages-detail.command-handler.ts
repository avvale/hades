import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertMessagesDetailCommand } from './insert-messages-detail.command';
import { InsertMessagesDetailService } from './insert-messages-detail.service';
import { 
    MessageDetailId, 
    MessageDetailTenantId, 
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

@CommandHandler(InsertMessagesDetailCommand)
export class InsertMessagesDetailCommandHandler implements ICommandHandler<InsertMessagesDetailCommand>
{
    constructor(
        private readonly insertMessagesDetailService: InsertMessagesDetailService
    ) { }

    async execute(command: InsertMessagesDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertMessagesDetailService.main(
            command.messagesDetail
                .map(messageDetail => { 
                    return {
                        id: new MessageDetailId(messageDetail.id),
                        tenantId: new MessageDetailTenantId(messageDetail.tenantId),
                        systemId: new MessageDetailSystemId(messageDetail.systemId),
                        systemName: new MessageDetailSystemName(messageDetail.systemName),
                        scenario: new MessageDetailScenario(messageDetail.scenario),
                        executionId: new MessageDetailExecutionId(messageDetail.executionId),
                        executionType: new MessageDetailExecutionType(messageDetail.executionType),
                        executionExecutedAt: new MessageDetailExecutionExecutedAt(messageDetail.executionExecutedAt),
                        executionMonitoringStartAt: new MessageDetailExecutionMonitoringStartAt(messageDetail.executionMonitoringStartAt),
                        executionMonitoringEndAt: new MessageDetailExecutionMonitoringEndAt(messageDetail.executionMonitoringEndAt),
                        flowId: new MessageDetailFlowId(messageDetail.flowId),
                        flowParty: new MessageDetailFlowParty(messageDetail.flowParty),
                        flowComponent: new MessageDetailFlowComponent(messageDetail.flowComponent),
                        flowInterfaceName: new MessageDetailFlowInterfaceName(messageDetail.flowInterfaceName),
                        flowInterfaceNamespace: new MessageDetailFlowInterfaceNamespace(messageDetail.flowInterfaceNamespace),
                        status: new MessageDetailStatus(messageDetail.status),
                        detail: new MessageDetailDetail(messageDetail.detail),
                        example: new MessageDetailExample(messageDetail.example),
                        startTimeAt: new MessageDetailStartTimeAt(messageDetail.startTimeAt),
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
                        
                    }
                })
        );
    }
}