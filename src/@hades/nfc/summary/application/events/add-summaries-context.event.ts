import { AggregateRoot } from '@nestjs/cqrs';
import { NfcSummary } from './../../domain/summary.aggregate';
import { CreatedSummaryEvent } from './created-summary.event';
import { DeletedSummaryEvent } from './deleted-summary.event';
import { CreatedSummariesEvent } from './created-summaries.event';
import { DeletedSummariesEvent } from './deleted-summaries.event';

export class AddSummariesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: NfcSummary[] = []
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
            new CreatedSummariesEvent(
                this.aggregateRoots.map(summary => 
                    new CreatedSummaryEvent(
                        summary.id.value,
                        summary.tagId.value,
                        summary.tenantId.value,
                        summary.accessAt.value,
                        summary.counter.value,
                        summary.createdAt?.value,
                        summary.updatedAt?.value,
                        summary.deletedAt?.value,
                        
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedSummariesEvent(
                this.aggregateRoots.map(summary => 
                    new DeletedSummaryEvent(
                        summary.id.value,
                        summary.tagId.value,
                        summary.tenantId.value,
                        summary.accessAt.value,
                        summary.counter.value,
                        summary.createdAt?.value,
                        summary.updatedAt?.value,
                        summary.deletedAt?.value,
                           
                    )
                )
            )
        );
    }   
}