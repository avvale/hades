import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt
    
} from './../../domain/value-objects';
import { IPermissionRepository } from './../../domain/permission.repository';
import { IamPermission } from './../../domain/permission.aggregate';

@Injectable()
export class UpdatePermissionService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPermissionRepository
    ) {}

    public async main(
        id: PermissionId,
        name?: PermissionName,
        boundedContextId?: PermissionBoundedContextId,
        roleIds?: PermissionRoleIds,
        
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const permission = IamPermission.register(
            id,
            name,
            boundedContextId,
            roleIds,
            null,
            new PermissionUpdatedAt(Utils.nowTimestamp()),
            null
        );

        // update
        await this.repository.update(permission);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const permissionRegister = this.publisher.mergeObjectContext(
            permission
        );

        permissionRegister.updated(permission); // apply event to model events
        permissionRegister.commit(); // commit all events of model
    }
}