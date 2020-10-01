import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    SystemId,
    SystemTenantId,
    SystemTenantCode,
    SystemVersion,
    SystemName,
    SystemEnvironment,
    SystemIsActive,
    SystemCancelledAt,
    SystemCreatedAt,
    SystemUpdatedAt,
    SystemDeletedAt
    
} from './../../domain/value-objects';
import { ISystemRepository } from './../../domain/system.repository';
import { CciSystem } from './../../domain/system.aggregate';

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
        tenantCode?: SystemTenantCode,
        version?: SystemVersion,
        name?: SystemName,
        environment?: SystemEnvironment,
        isActive?: SystemIsActive,
        cancelledAt?: SystemCancelledAt,
        
    ): Promise<void>
    {        
        // create aggregate with factory pattern
        const system = CciSystem.register(
            id,
            tenantId,
            tenantCode,
            version,
            name,
            environment,
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