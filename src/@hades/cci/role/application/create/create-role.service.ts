import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    RoleId,
    RoleTenantId,
    RoleTenantCode,
    RoleName,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from './../../domain/value-objects';
import { IRoleRepository } from './../../domain/role.repository';
import { CciRole } from './../../domain/role.aggregate';

@Injectable()
export class CreateRoleService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRoleRepository,
    ) {}

    public async main(
        payload: {
            id: RoleId,
            tenantId: RoleTenantId,
            tenantCode: RoleTenantCode,
            name: RoleName,
        },
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const role = CciRole.register(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.name,
            new RoleCreatedAt({currentTimestamp: true}),
            new RoleUpdatedAt({currentTimestamp: true}),
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