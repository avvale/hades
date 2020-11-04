import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
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
export class UpdateRoleService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRoleRepository,
    ) {}

    public async main(
        payload: {
            id: RoleId,
            tenantId?: RoleTenantId,
            tenantCode?: RoleTenantCode,
            name?: RoleName,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const role = CciRole.register(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.name,
            null,
            new RoleUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(role, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const roleRegister = this.publisher.mergeObjectContext(
            role
        );

        roleRegister.updated(role); // apply event to model events
        roleRegister.commit(); // commit all events of model
    }
}