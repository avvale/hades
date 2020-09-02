import { AggregateRoot } from '@nestjs/cqrs';
import { 
    RoleId, 
    RoleName, 
    RoleIsMaster, 
    RoleCreatedAt, 
    RoleUpdatedAt, 
    RoleDeletedAt
    
} from './value-objects';
import { CreatedRoleEvent } from './../application/events/created-role.event';
import { UpdatedRoleEvent } from './../application/events/updated-role.event';
import { DeletedRoleEvent } from './../application/events/deleted-role.event';

export class AdminRole extends AggregateRoot
{
    id: RoleId;
    name: RoleName;
    isMaster: RoleIsMaster;
    createdAt: RoleCreatedAt;
    updatedAt: RoleUpdatedAt;
    deletedAt: RoleDeletedAt;
    
    constructor(id?: RoleId, name?: RoleName, isMaster?: RoleIsMaster, createdAt?: RoleCreatedAt, updatedAt?: RoleUpdatedAt, deletedAt?: RoleDeletedAt, )
    {
        super();
        
        this.id = id;
        this.name = name;
        this.isMaster = isMaster;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: RoleId, name: RoleName, isMaster: RoleIsMaster, createdAt: RoleCreatedAt, updatedAt: RoleUpdatedAt, deletedAt: RoleDeletedAt, ): AdminRole
    {
        return new AdminRole(id, name, isMaster, createdAt, updatedAt, deletedAt, );
    }

    created(role: AdminRole): void
    {
        this.apply(
            new CreatedRoleEvent(
                role.id.value,
                role.name.value,
                role.isMaster.value,
                role.createdAt?.value,
                role.updatedAt?.value,
                role.deletedAt?.value,
                
            )
        );
    }

    updated(role: AdminRole): void
    {
        this.apply(
            new UpdatedRoleEvent(
                role.id.value,
                role.name?.value,
                role.isMaster?.value,
                role.createdAt?.value,
                role.updatedAt?.value,
                role.deletedAt?.value,
                
            )
        );
    }

    deleted(role: AdminRole): void
    {
        this.apply(
            new DeletedRoleEvent(
                role.id.value,
                role.name.value,
                role.isMaster.value,
                role.createdAt?.value,
                role.updatedAt?.value,
                role.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            name: this.name.value,
            isMaster: this.isMaster.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
