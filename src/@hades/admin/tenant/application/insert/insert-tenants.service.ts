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
import { ITenantRepository } from '../../domain/tenant.repository';
import { AdminTenant } from './../../domain/tenant.entity';

@Injectable()
export class InsertTenantsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ITenantRepository
    ) {}

    public async main(
        tenants: {
            id: TenantId,
            name: TenantName,
            code: TenantCode,
            logo: TenantLogo,
            isActive: TenantIsActive,
            data: TenantData,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const entityTenants = tenants.map(tenant => AdminTenant.register(
            tenant.id,
            tenant.name,
            tenant.code,
            tenant.logo,
            tenant.isActive,
            tenant.data,
            new TenantCreatedAt(Utils.nowTimestamp()),
            new TenantUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(entityTenants);

        // TODO a falta de definir eventos
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        // const tenantsRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id)
        // );
        // 
        // tenantsRegistered.created(tenants); // apply event to model events
        // tenantsRegistered.commit(); // commit all events of model
    }
}