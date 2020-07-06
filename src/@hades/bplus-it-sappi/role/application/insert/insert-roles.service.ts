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
import { BplusItSappiRole } from './../../domain/role.entity';

@Injectable()
export class InsertRolesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRoleRepository
    ) {}

    public async main(
        roles: {
            id: RoleId,
            tenantId: RoleTenantId,
            name: RoleName,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const entityRoles = roles.map(role => BplusItSappiRole.register(
            role.id,
            role.tenantId,
            role.name,
            new RoleCreatedAt(Utils.nowTimestamp()),
            new RoleUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(entityRoles);

        // TODO a falta de definir eventos
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        // const rolesRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id)
        // );
        // 
        // rolesRegistered.created(roles); // apply event to model events
        // rolesRegistered.commit(); // commit all events of model
    }
}