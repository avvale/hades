import { AggregateRoot } from '@nestjs/cqrs';
import { 
    PermissionId, 
    PermissionBoundedContextId, 
    PermissionName, 
    PermissionCreatedAt, 
    PermissionUpdatedAt, 
    PermissionDeletedAt
    
} from './value-objects';
import { CreatedPermissionEvent } from './../application/events/created-permission.event';
import { UpdatedPermissionEvent } from './../application/events/updated-permission.event';
import { DeletedPermissionEvent } from './../application/events/deleted-permission.event';
import { AdminBoundedContext } from '@hades/admin/bounded-context/domain/bounded-context.aggregate';

export class AdminPermission extends AggregateRoot
{
    id: PermissionId;
    boundedContextId: PermissionBoundedContextId;
    boundedContext: AdminBoundedContext;
    name: PermissionName;
    createdAt: PermissionCreatedAt;
    updatedAt: PermissionUpdatedAt;
    deletedAt: PermissionDeletedAt;
    
    constructor(id?: PermissionId, boundedContextId?: PermissionBoundedContextId, name?: PermissionName, createdAt?: PermissionCreatedAt, updatedAt?: PermissionUpdatedAt, deletedAt?: PermissionDeletedAt, )
    {
        super();
        
        this.id = id;
        this.boundedContextId = boundedContextId;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: PermissionId,boundedContextId: PermissionBoundedContextId,name: PermissionName,createdAt: PermissionCreatedAt,updatedAt: PermissionUpdatedAt,deletedAt: PermissionDeletedAt,): AdminPermission
    {
        return new AdminPermission(id, boundedContextId, name, createdAt, updatedAt, deletedAt, );
    }

    created(permission: AdminPermission): void
    {
        this.apply(
            new CreatedPermissionEvent(
                permission.id.value,
                permission.boundedContextId.value,
                permission.name.value,
                permission.createdAt?.value,
                permission.updatedAt?.value,
                permission.deletedAt?.value,
                
            )
        );
    }

    updated(permission: AdminPermission): void
    {
        this.apply(
            new UpdatedPermissionEvent(
                permission.id.value,
                permission.boundedContextId?.value,
                permission.name?.value,
                permission.createdAt?.value,
                permission.updatedAt?.value,
                permission.deletedAt?.value,
                
            )
        );
    }

    deleted(permission: AdminPermission): void
    {
        this.apply(
            new DeletedPermissionEvent(
                permission.id.value,
                permission.boundedContextId.value,
                permission.name.value,
                permission.createdAt?.value,
                permission.updatedAt?.value,
                permission.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            boundedContextId: this.boundedContextId.value,
            name: this.name.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
