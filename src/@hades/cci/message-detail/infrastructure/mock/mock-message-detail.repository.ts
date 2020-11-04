import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IMessageDetailRepository } from '@hades/cci/message-detail/domain/message-detail.repository';
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
} from '@hades/cci/message-detail/domain/value-objects';
import { CciMessageDetail } from './../../domain/message-detail.aggregate';
import { messagesDetail } from './../seeds/message-detail.seed';

@Injectable()
export class MockMessageDetailRepository extends MockRepository<CciMessageDetail> implements IMessageDetailRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CciMessageDetail';
    public collectionSource: CciMessageDetail[];
    public deletedAtInstance: MessageDetailDeletedAt = new MessageDetailDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset()
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>messagesDetail)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CciMessageDetail.register(
                    new MessageDetailId(itemCollection.id),
                    new MessageDetailTenantId(itemCollection.tenantId),
                    new MessageDetailTenantCode(itemCollection.tenantCode),
                    new MessageDetailSystemId(itemCollection.systemId),
                    new MessageDetailSystemName(itemCollection.systemName),
                    new MessageDetailScenario(itemCollection.scenario),
                    new MessageDetailExecutionId(itemCollection.executionId),
                    new MessageDetailExecutionType(itemCollection.executionType),
                    new MessageDetailExecutionExecutedAt(itemCollection.executionExecutedAt),
                    new MessageDetailExecutionMonitoringStartAt(itemCollection.executionMonitoringStartAt),
                    new MessageDetailExecutionMonitoringEndAt(itemCollection.executionMonitoringEndAt),
                    new MessageDetailFlowHash(itemCollection.flowHash),
                    new MessageDetailFlowParty(itemCollection.flowParty),
                    new MessageDetailFlowReceiverParty(itemCollection.flowReceiverParty),
                    new MessageDetailFlowComponent(itemCollection.flowComponent),
                    new MessageDetailFlowReceiverComponent(itemCollection.flowReceiverComponent),
                    new MessageDetailFlowInterfaceName(itemCollection.flowInterfaceName),
                    new MessageDetailFlowInterfaceNamespace(itemCollection.flowInterfaceNamespace),
                    new MessageDetailStatus(itemCollection.status),
                    new MessageDetailRefMessageId(itemCollection.refMessageId),
                    new MessageDetailDetail(itemCollection.detail),
                    new MessageDetailExample(itemCollection.example),
                    new MessageDetailStartTimeAt(itemCollection.startTimeAt),
                    new MessageDetailDirection(itemCollection.direction),
                    new MessageDetailErrorCategory(itemCollection.errorCategory),
                    new MessageDetailErrorCode(itemCollection.errorCode),
                    new MessageDetailErrorLabel(itemCollection.errorLabel),
                    new MessageDetailNode(itemCollection.node),
                    new MessageDetailProtocol(itemCollection.protocol),
                    new MessageDetailQualityOfService(itemCollection.qualityOfService),
                    new MessageDetailReceiverParty(itemCollection.receiverParty),
                    new MessageDetailReceiverComponent(itemCollection.receiverComponent),
                    new MessageDetailReceiverInterface(itemCollection.receiverInterface),
                    new MessageDetailReceiverInterfaceNamespace(itemCollection.receiverInterfaceNamespace),
                    new MessageDetailRetries(itemCollection.retries),
                    new MessageDetailSize(itemCollection.size),
                    new MessageDetailTimesFailed(itemCollection.timesFailed),
                    new MessageDetailNumberMax(itemCollection.numberMax),
                    new MessageDetailNumberDays(itemCollection.numberDays),
                    new MessageDetailCreatedAt(itemCollection.createdAt),
                    new MessageDetailUpdatedAt(itemCollection.updatedAt),
                    new MessageDetailDeletedAt(itemCollection.deletedAt),
                    
                ));
        }
    }
}