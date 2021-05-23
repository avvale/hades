import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
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
import { CciMessageDetail } from './../../domain/message-detail.aggregate';
import { messagesDetail } from './../seeds/message-detail.seed';

@Injectable()
export class MockMessageDetailSeeder extends MockSeeder<CciMessageDetail>
{
    public collectionSource: CciMessageDetail[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let messageDetail of messagesDetail)
        {
            this.collectionSource.push(
                CciMessageDetail.register(
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
                    new MessageDetailNumberMax(messageDetail.numberMax),
                    new MessageDetailNumberDays(messageDetail.numberDays),
                    new MessageDetailCreatedAt({currentTimestamp: true}),
                    new MessageDetailUpdatedAt({currentTimestamp: true}),
                    new MessageDetailDeletedAt(null),
                )
            );
        }
    }
}