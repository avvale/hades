import { AggregateRoot } from '@nestjs/cqrs';
import { 
    SummaryId, 
    SummaryTagId, 
    SummaryTenantId, 
    SummaryAccessAt, 
    SummaryCounter, 
    SummaryCreatedAt, 
    SummaryUpdatedAt, 
    SummaryDeletedAt
    
} from './value-objects';
import { CreatedSummaryEvent } from './../application/events/created-summary.event';
import { UpdatedSummaryEvent } from './../application/events/updated-summary.event';
import { DeletedSummaryEvent } from './../application/events/deleted-summary.event';
import { NfcTag } from '@hades/nfc/tag/domain/tag.aggregate';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.aggregate';

export class NfcSummary extends AggregateRoot
{
    id: SummaryId;
    tagId: SummaryTagId;
    tag: NfcTag;
    tenantId: SummaryTenantId;
    tenant: AdminTenant;
    accessAt: SummaryAccessAt;
    counter: SummaryCounter;
    createdAt: SummaryCreatedAt;
    updatedAt: SummaryUpdatedAt;
    deletedAt: SummaryDeletedAt;
    
    constructor(id?: SummaryId, tagId?: SummaryTagId, tenantId?: SummaryTenantId, accessAt?: SummaryAccessAt, counter?: SummaryCounter, createdAt?: SummaryCreatedAt, updatedAt?: SummaryUpdatedAt, deletedAt?: SummaryDeletedAt, )
    {
        super();
        
        this.id = id;
        this.tagId = tagId;
        this.tenantId = tenantId;
        this.accessAt = accessAt;
        this.counter = counter;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: SummaryId, tagId: SummaryTagId, tenantId: SummaryTenantId, accessAt: SummaryAccessAt, counter: SummaryCounter, createdAt: SummaryCreatedAt, updatedAt: SummaryUpdatedAt, deletedAt: SummaryDeletedAt, ): NfcSummary
    {
        return new NfcSummary(id, tagId, tenantId, accessAt, counter, createdAt, updatedAt, deletedAt, );
    }

    created(summary: NfcSummary): void
    {
        this.apply(
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
        );
    }

    updated(summary: NfcSummary): void
    {
        this.apply(
            new UpdatedSummaryEvent(
                summary.id.value,
                summary.tagId?.value,
                summary.tenantId?.value,
                summary.accessAt?.value,
                summary.counter?.value,
                summary.createdAt?.value,
                summary.updatedAt?.value,
                summary.deletedAt?.value,
                
            )
        );
    }

    deleted(summary: NfcSummary): void
    {
        this.apply(
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
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            tagId: this.tagId.value,
            tenantId: this.tenantId.value,
            accessAt: this.accessAt.value,
            counter: this.counter.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
