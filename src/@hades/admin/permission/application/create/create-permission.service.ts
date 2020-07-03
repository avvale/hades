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
export class CreatePermissionService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPermissionRepository
    ) {}

    public async main(
        id: PermissionId,
        boundedContextId: PermissionBoundedContextId,
        name: PermissionName,
        
    ): Promise<void>
    {
        // create object with factory pattern
        const permission = AdminPermission.register(
            id,
            boundedContextId,
            name,
            new PermissionCreatedAt(Utils.nowTimestamp()),
            new PermissionUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(permission);

        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const permissionRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        permissionRegister.created(permission); // apply event to model events
        permissionRegister.commit(); // commit all events of model
    }
}