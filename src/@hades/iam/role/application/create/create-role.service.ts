import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissionIds,
    RoleAccountIds,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt
    
} from './../../domain/value-objects';
import { IRoleRepository } from './../../domain/role.repository';
import { IamRole } from './../../domain/role.aggregate';

@Injectable()
export class CreateRoleService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRoleRepository
    ) {}

    public async main(
        id: RoleId,
        name: RoleName,
        isMaster: RoleIsMaster,
        permissionIds: RolePermissionIds,
        accountIds: RoleAccountIds,
        
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const role = IamRole.register(
            id,
            name,
            isMaster,
            permissionIds,
            accountIds,
            new RoleCreatedAt(Utils.nowTimestamp()),
            new RoleUpdatedAt(Utils.nowTimestamp()),
            null
        );

        // create
        await this.repository.create(role);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const roleRegister = this.publisher.mergeObjectContext(
            role
        );

        roleRegister.created(role); // apply event to model events
        roleRegister.commit(); // commit all events of model
    }
}