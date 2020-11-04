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
import { AddRolesContextEvent } from './../events/add-roles-context.event';

@Injectable()
export class CreateRolesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRoleRepository,
    ) {}

    public async main(
        roles: {
            id: RoleId,
            tenantId: RoleTenantId,
            tenantCode: RoleTenantCode,
            name: RoleName,
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateRoles = roles.map(role => CciRole.register(
            role.id,
            role.tenantId,
            role.tenantCode,
            role.name,
            new RoleCreatedAt({currentTimestamp: true}),
            new RoleUpdatedAt({currentTimestamp: true}),
            null
        ));

        // insert
        await this.repository.insert(aggregateRoles);

        // create AddRolesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const rolesRegistered = this.publisher.mergeObjectContext(new AddRolesContextEvent(aggregateRoles));

        rolesRegistered.created(); // apply event to model events
        rolesRegistered.commit(); // commit all events of model
    }
}