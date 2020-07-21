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
import { AddPermissionsContextEvent } from './../events/add-permissions-context.event';

@Injectable()
export class CreatePermissionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPermissionRepository
    ) {}

    public async main(
        permissions: {
            id: PermissionId,
            boundedContextId: PermissionBoundedContextId,
            name: PermissionName,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregatePermissions = permissions.map(permission => AdminPermission.register(
            permission.id,
            permission.boundedContextId,
            permission.name,
            new PermissionCreatedAt(Utils.nowTimestamp()),
            new PermissionUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregatePermissions);

        // create AddPermissionsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const permissionsRegistered = this.publisher.mergeObjectContext(new AddPermissionsContextEvent(aggregatePermissions));
 
        permissionsRegistered.created(); // apply event to model events
        permissionsRegistered.commit(); // commit all events of model
    }
}