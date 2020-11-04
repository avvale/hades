import { AggregateRoot } from '@nestjs/cqrs';
import { CciMessageDetail } from './../../domain/message-detail.aggregate';
import { CreatedMessageDetailEvent } from './created-message-detail.event';
import { DeletedMessageDetailEvent } from './deleted-message-detail.event';
import { CreatedMessagesDetailEvent } from './created-messages-detail.event';
import { DeletedMessagesDetailEvent } from './deleted-messages-detail.event';

export class AddMessagesDetailContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: CciMessageDetail[] = [],
    ) {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created()
    {
        this.apply(
            new CreatedMessagesDetailEvent(
                this.aggregateRoots.map(messageDetail =>
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
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedMessagesDetailEvent(
                this.aggregateRoots.map(messageDetail =>
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
                )
            )
        );
    }
}