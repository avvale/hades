import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    RoleId, 
    RoleTenantId, 
    RoleName, 
    RoleCreatedAt, 
    RoleUpdatedAt, 
    RoleDeletedAt
    
} from './../../domain/value-objects';
import { IRoleRepository } from './../../domain/role.repository';
import { BplusItSappiRole } from './../../domain/role.aggregate';

@Injectable()
export class UpdateRoleService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRoleRepository
    ) {}

    public async main(
        id: RoleId,
        tenantId?: RoleTenantId,
        name?: RoleName,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const role = BplusItSappiRole.register(
            id,
            tenantId,
            name,
            null,
            new RoleUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(role);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const roleRegister = this.publisher.mergeObjectContext(
            role
        );
        
        roleRegister.updated(role); // apply event to model events
        roleRegister.commit(); // commit all events of model
    }
}