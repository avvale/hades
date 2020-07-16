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
export class InsertSystemsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISystemRepository
    ) {}

    public async main(
        systems: {
            id: SystemId,
            tenantId: SystemTenantId,
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

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const systemsRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id) // there may be cases where the database object is direct to the command, for example in the update, only one field can be updated
        // );
        // 
        // systemsRegistered.created(systems); // apply event to model events
        // systemsRegistered.commit(); // commit all events of model
    }
}