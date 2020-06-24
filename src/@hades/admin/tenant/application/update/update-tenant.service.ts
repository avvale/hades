import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    TenantId, 
    TenantName, 
    TenantCode, 
    TenantLogo, 
    TenantIsActive, 
    TenantData, 
    TenantCreatedAt, 
    TenantUpdatedAt, 
    TenantDeletedAt
    
} from './../../domain/value-objects';
import { ITenantRepository } from './../../domain/tenant.repository';
import { AdminTenant } from './../../domain/tenant.entity';

@Injectable()
export class UpdateTenantService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ITenantRepository
    ) {}

    public async main(
        id: TenantId,
        name?: TenantName,
        code?: TenantCode,
        logo?: TenantLogo,
        isActive?: TenantIsActive,
        data?: TenantData,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const tenant = AdminTenant.register(
            id,
            name,
            code,
            logo,
            isActive,
            data,
            null,
            new TenantUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(tenant);        
            
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const tenantRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        tenantRegister.updated(tenant); // apply event to model events
        tenantRegister.commit(); // commit all events of model
    }
}