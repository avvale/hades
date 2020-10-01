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
    TenantAccountIds,
    TenantCreatedAt,
    TenantUpdatedAt,
    TenantDeletedAt
    
} from './../../domain/value-objects';
import { ITenantRepository } from './../../domain/tenant.repository';
import { IamTenant } from './../../domain/tenant.aggregate';

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
        accountIds?: TenantAccountIds,
        
    ): Promise<void>
    {        
        // create aggregate with factory pattern
        const tenant = IamTenant.register(
            id,
            name,
            code,
            logo,
            isActive,
            data,
            accountIds,
            null,
            new TenantUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(tenant);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const tenantRegister = this.publisher.mergeObjectContext(
            tenant
        );
        
        tenantRegister.updated(tenant); // apply event to model events
        tenantRegister.commit(); // commit all events of model
    }
}