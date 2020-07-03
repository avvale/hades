import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    PermissionId, 
    PermissionBoundedContextId, 
    PermissionName, 
    PermissionCreatedAt, 
    PermissionUpdatedAt, 
    PermissionDeletedAt
    
} from './../../domain/value-objects';
import { IPermissionRepository } from './../../domain/permission.repository';
import { AdminPermission } from './../../domain/permission.aggregate';

@Injectable()
export class UpdatePermissionService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPermissionRepository
    ) {}

    public async main(
        id: PermissionId,
        boundedContextId?: PermissionBoundedContextId,
        name?: PermissionName,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const permission = AdminPermission.register(
            id,
            boundedContextId,
            name,
            null,
            new PermissionUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(permission);        
            
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const permissionRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        permissionRegister.updated(permission); // apply event to model events
        permissionRegister.commit(); // commit all events of model
    }
}