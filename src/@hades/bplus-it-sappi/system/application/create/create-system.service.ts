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
export class CreateSystemService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISystemRepository
    ) {}

    public async main(
        id: SystemId,
        tenantId: SystemTenantId,
        name: SystemName,
        tenantCode: SystemTenantCode,
        environment: SystemEnvironment,
        version: SystemVersion,
        isActive: SystemIsActive,
        cancelledAt: SystemCancelledAt,
        
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
            new SystemCreatedAt(Utils.nowTimestamp()),
            new SystemUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(system);

        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const systemRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        systemRegister.created(system); // apply event to model events
        systemRegister.commit(); // commit all events of model
    }
}