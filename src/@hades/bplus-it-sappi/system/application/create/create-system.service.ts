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
import { BplusItSappiSystem } from './../../domain/system.aggregate';

@Injectable()
export class CreateSystemService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISystemRepository
    ) {}

    public async main(
        id: SystemId,
        tenantId: SystemTenantId,
        tenantCode: SystemTenantCode,
        version: SystemVersion,
        name: SystemName,
        environment: SystemEnvironment,
        isActive: SystemIsActive,
        cancelledAt: SystemCancelledAt,
        
    ): Promise<void>
    {
        // create object with factory pattern
        const system = BplusItSappiSystem.register(
            id,
            tenantId,
            tenantCode,
            version,
            name,
            environment,
            isActive,
            cancelledAt,
            new SystemCreatedAt(Utils.nowTimestamp()),
            new SystemUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(system);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const systemRegister = this.publisher.mergeObjectContext(
            system
        );
        
        systemRegister.created(system); // apply event to model events
        systemRegister.commit(); // commit all events of model
    }
}