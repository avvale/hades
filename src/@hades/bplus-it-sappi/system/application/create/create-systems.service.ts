import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    SystemId, 
    SystemTenantId, 
    SystemTenantCode, 
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
import { AddSystemsContextEvent } from './../events/add-systems-context.event';

@Injectable()
export class CreateSystemsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISystemRepository
    ) {}

    public async main(
        systems: {
            id: SystemId,
            tenantId: SystemTenantId,
            tenantCode: SystemTenantCode,
            name: SystemName,
            tenantCode: SystemTenantCode,
            environment: SystemEnvironment,
            version: SystemVersion,
            isActive: SystemIsActive,
            cancelledAt: SystemCancelledAt,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateSystems = systems.map(system => BplusItSappiSystem.register(
            system.id,
            system.tenantId,
            system.tenantCode,
            system.name,
            system.tenantCode,
            system.environment,
            system.version,
            system.isActive,
            system.cancelledAt,
            new SystemCreatedAt(Utils.nowTimestamp()),
            new SystemUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateSystems);

        // create AddSystemsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const systemsRegistered = this.publisher.mergeObjectContext(new AddSystemsContextEvent(aggregateSystems));
 
        systemsRegistered.created(); // apply event to model events
        systemsRegistered.commit(); // commit all events of model
    }
}