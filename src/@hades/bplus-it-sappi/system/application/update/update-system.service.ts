import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    SystemId, 
    SystemTenantId, 
    SystemName, 
    SystemTenantCode, 
    SystemEnvironment, 
    SystemVersion, 
    SystemIsActive, 
    SystemCancelledAt, 
    SystemCreatedAt, 
    SystemUpdatedAt, 
    SystemDeletedAt
    
} from './../../domain/value-objects';
import { ISystemRepository } from './../../domain/system.repository';
import { BplusItSappiSystem } from './../../domain/system.aggregate';

@Injectable()
export class UpdateSystemService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISystemRepository
    ) {}

    public async main(
        id: SystemId,
        tenantId?: SystemTenantId,
        name?: SystemName,
        tenantCode?: SystemTenantCode,
        environment?: SystemEnvironment,
        version?: SystemVersion,
        isActive?: SystemIsActive,
        cancelledAt?: SystemCancelledAt,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const system = BplusItSappiSystem.register(
            id,
            tenantId,
            name,
            tenantCode,
            environment,
            version,
            isActive,
            cancelledAt,
            null,
            new SystemUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(system);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const systemRegister = this.publisher.mergeObjectContext(
            system
        );
        
        systemRegister.updated(system); // apply event to model events
        systemRegister.commit(); // commit all events of model
    }
}