import { AggregateRoot } from '@nestjs/cqrs';
import { 
    PermissionId, 
    PermissionModuleId, 
    PermissionName, 
    PermissionCreatedAt, 
    PermissionUpdatedAt, 
    PermissionDeletedAt
    
} from './value-objects';
import { CreatedPermissionEvent } from './../application/events/created-permission.event';
import { UpdatedPermissionEvent } from './../application/events/updated-permission.event';
import { DeletedPermissionEvent } from './../application/events/deleted-permission.event';
import { AdminModule } from '@hades/admin/module/domain/module.entity';

export class AdminPermission extends AggregateRoot
{
    id: PermissionId;
    moduleId: PermissionModuleId;
    module: AdminModule;
    name: PermissionName;
    createdAt: PermissionCreatedAt;
    updatedAt: PermissionUpdatedAt;
    deletedAt: PermissionDeletedAt;
    
    constructor(id?: PermissionId, moduleId?: PermissionModuleId, name?: PermissionName, createdAt?: PermissionCreatedAt, updatedAt?: PermissionUpdatedAt, deletedAt?: PermissionDeletedAt, )
    {
        super();
        
        this.id = id;
        this.moduleId = moduleId;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: PermissionId,moduleId: PermissionModuleId,name: PermissionName,createdAt: PermissionCreatedAt,updatedAt: PermissionUpdatedAt,deletedAt: PermissionDeletedAt,): AdminPermission
    {
        return new AdminPermission(id, moduleId, name, createdAt, updatedAt, deletedAt, );
    }

    created(permission: AdminPermission): void
    {
        this.apply(
            new CreatedPermissionEvent(
                permission.id.value,
                permission.moduleId.value,
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
                permission.moduleId?.value,
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
                permission.moduleId.value,
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
            moduleId: this.moduleId.value,
            name: this.name.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
