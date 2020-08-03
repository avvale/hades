import { AggregateRoot } from '@nestjs/cqrs';
import { 
    TagId, 
    TagCode, 
    TagTenantId, 
    TagTenantCode, 
    TagUrlBase, 
    TagParams, 
    TagOffset, 
    TagIsSessionRequired, 
    TagCreatedAt, 
    TagUpdatedAt, 
    TagDeletedAt
    
} from './value-objects';
import { CreatedTagEvent } from './../application/events/created-tag.event';
import { UpdatedTagEvent } from './../application/events/updated-tag.event';
import { DeletedTagEvent } from './../application/events/deleted-tag.event';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.aggregate';

export class NfcTag extends AggregateRoot
{
    id: TagId;
    code: TagCode;
    tenantId: TagTenantId;
    tenantCode: TagTenantCode;
    urlBase: TagUrlBase;
    params: TagParams;
    offset: TagOffset;
    isSessionRequired: TagIsSessionRequired;
    createdAt: TagCreatedAt;
    updatedAt: TagUpdatedAt;
    deletedAt: TagDeletedAt;
    
    constructor(id?: TagId, code?: TagCode, tenantId?: TagTenantId, tenantCode?: TagTenantCode, urlBase?: TagUrlBase, params?: TagParams, offset?: TagOffset, isSessionRequired?: TagIsSessionRequired, createdAt?: TagCreatedAt, updatedAt?: TagUpdatedAt, deletedAt?: TagDeletedAt, )
    {
        super();
        
        this.id = id;
        this.code = code;
        this.tenantId = tenantId;
        this.tenantCode = tenantCode;
        this.urlBase = urlBase;
        this.params = params;
        this.offset = offset;
        this.isSessionRequired = isSessionRequired;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: TagId, code: TagCode, tenantId: TagTenantId, tenantCode: TagTenantCode, urlBase: TagUrlBase, params: TagParams, offset: TagOffset, isSessionRequired: TagIsSessionRequired, createdAt: TagCreatedAt, updatedAt: TagUpdatedAt, deletedAt: TagDeletedAt, ): NfcTag
    {
        return new NfcTag(id, code, tenantId, tenantCode, urlBase, params, offset, isSessionRequired, createdAt, updatedAt, deletedAt, );
    }

    created(tag: NfcTag): void
    {
        this.apply(
            new CreatedTagEvent(
                tag.id.value,
                tag.code.value,
                tag.tenantId.value,
                tag.tenantCode.value,
                tag.urlBase.value,
                tag.params?.value,
                tag.offset?.value,
                tag.isSessionRequired?.value,
                tag.createdAt?.value,
                tag.updatedAt?.value,
                tag.deletedAt?.value,
                
            )
        );
    }

    updated(tag: NfcTag): void
    {
        this.apply(
            new UpdatedTagEvent(
                tag.id.value,
                tag.code?.value,
                tag.tenantId?.value,
                tag.tenantCode?.value,
                tag.urlBase?.value,
                tag.params?.value,
                tag.offset?.value,
                tag.isSessionRequired?.value,
                tag.createdAt?.value,
                tag.updatedAt?.value,
                tag.deletedAt?.value,
                
            )
        );
    }

    deleted(tag: NfcTag): void
    {
        this.apply(
            new DeletedTagEvent(
                tag.id.value,
                tag.code.value,
                tag.tenantId.value,
                tag.tenantCode.value,
                tag.urlBase.value,
                tag.params?.value,
                tag.offset?.value,
                tag.isSessionRequired?.value,
                tag.createdAt?.value,
                tag.updatedAt?.value,
                tag.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            code: this.code.value,
            tenantId: this.tenantId.value,
            tenantCode: this.tenantCode.value,
            urlBase: this.urlBase.value,
            params: this.params?.value,
            offset: this.offset?.value,
            isSessionRequired: this.isSessionRequired?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
