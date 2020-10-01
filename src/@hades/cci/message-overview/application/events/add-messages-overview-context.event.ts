import { AggregateRoot } from '@nestjs/cqrs';
import { CciMessageOverview } from './../../domain/message-overview.aggregate';
import { CreatedMessageOverviewEvent } from './created-message-overview.event';
import { DeletedMessageOverviewEvent } from './deleted-message-overview.event';
import { CreatedMessagesOverviewEvent } from './created-messages-overview.event';
import { DeletedMessagesOverviewEvent } from './deleted-messages-overview.event';

export class AddMessagesOverviewContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: CciMessageOverview[] = []
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
            new CreatedMessagesOverviewEvent(
                this.aggregateRoots.map(messageOverview => 
                    new CreatedMessageOverviewEvent(
                        messageOverview.id.value,
                        messageOverview.tenantId.value,
                        messageOverview.tenantCode.value,
                        messageOverview.systemId.value,
                        messageOverview.systemName.value,
                        messageOverview.executionId.value,
                        messageOverview.executionType.value,
                        messageOverview.executionExecutedAt.value,
                        messageOverview.executionMonitoringStartAt.value,
                        messageOverview.executionMonitoringEndAt.value,
                        messageOverview.numberMax?.value,
                        messageOverview.numberDays?.value,
                        messageOverview.success?.value,
                        messageOverview.cancelled?.value,
                        messageOverview.delivering?.value,
                        messageOverview.error?.value,
                        messageOverview.holding?.value,
                        messageOverview.toBeDelivered?.value,
                        messageOverview.waiting?.value,
                        messageOverview.createdAt?.value,
                        messageOverview.updatedAt?.value,
                        messageOverview.deletedAt?.value,
                        
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedMessagesOverviewEvent(
                this.aggregateRoots.map(messageOverview => 
                    new DeletedMessageOverviewEvent(
                        messageOverview.id.value,
                        messageOverview.tenantId.value,
                        messageOverview.tenantCode.value,
                        messageOverview.systemId.value,
                        messageOverview.systemName.value,
                        messageOverview.executionId.value,
                        messageOverview.executionType.value,
                        messageOverview.executionExecutedAt.value,
                        messageOverview.executionMonitoringStartAt.value,
                        messageOverview.executionMonitoringEndAt.value,
                        messageOverview.numberMax?.value,
                        messageOverview.numberDays?.value,
                        messageOverview.success?.value,
                        messageOverview.cancelled?.value,
                        messageOverview.delivering?.value,
                        messageOverview.error?.value,
                        messageOverview.holding?.value,
                        messageOverview.toBeDelivered?.value,
                        messageOverview.waiting?.value,
                        messageOverview.createdAt?.value,
                        messageOverview.updatedAt?.value,
                        messageOverview.deletedAt?.value,
                           
                    )
                )
            )
        );
    }   
}