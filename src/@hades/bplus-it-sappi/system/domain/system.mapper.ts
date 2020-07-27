import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiSystem } from './system.aggregate';
import { SystemResponse } from './system.response';
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
    
} from './value-objects';

export class SystemMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param system
     */
    mapObjectToAggregate(system: ObjectLiteral): BplusItSappiSystem
    {
        return this.makeAggregate(system);
    }

    /**
     * Map array of objects to array aggregates
     * @param systems 
     */
    mapObjectsToAggregates(systems: ObjectLiteral[]): BplusItSappiSystem[]
    {
        return systems.map(system  => this.makeAggregate(system ));
    }

    /**
     * Map aggregate to response
     * @param system 
     */
    mapAggregateToResponse(system: BplusItSappiSystem): SystemResponse
    {
        return this.makeResponse(system);
    }

    /**
     * Map array of aggregates to array responses
     * @param systems
     */
    mapAggregatesToResponses(systems: BplusItSappiSystem[]): SystemResponse[]
    {
        return systems.map(system => this.makeResponse(system));
    }

    private makeAggregate(system: ObjectLiteral): BplusItSappiSystem
    {
        return BplusItSappiSystem.register(
            new SystemId(system.id),
            new SystemTenantId(system.tenantId),
            new SystemTenantCode(system.tenantCode),
            new SystemVersion(system.version),
            new SystemName(system.name),
            new SystemEnvironment(system.environment),
            new SystemIsActive(system.isActive),
            new SystemCancelledAt(system.cancelledAt),
            new SystemCreatedAt(system.createdAt),
            new SystemUpdatedAt(system.updatedAt),
            new SystemDeletedAt(system.deletedAt),
              
        );
    }

    private makeResponse(system: BplusItSappiSystem): SystemResponse
    {
        return new SystemResponse(
            system.id.value,
            system.tenantId.value,
            system.tenantCode.value,
            system.version.value,
            system.name.value,
            system.environment.value,
            system.isActive.value,
            system.cancelledAt.value,
            system.createdAt.value,
            system.updatedAt.value,
            system.deletedAt.value,
            
        );
    }
}