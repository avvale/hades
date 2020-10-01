import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    RoleId,
    RoleTenantId,
    RoleTenantCode,
    RoleName,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt
    
} from './../../domain/value-objects';
import { IRoleRepository } from './../../domain/role.repository';
import { CciRole } from './../../domain/role.aggregate';

@Injectable()
export class CreateRoleService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRoleRepository
    ) {}

    public async main(
        id: RoleId,
        tenantId: RoleTenantId,
        tenantCode: RoleTenantCode,
        name: RoleName,
        
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const role = CciRole.register(
            id,
            tenantId,
            tenantCode,
            name,
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