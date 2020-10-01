import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { CciDataLake } from './data-lake.aggregate';
import { DataLakeResponse } from './data-lake.response';
import { 
    DataLakeId,
    DataLakeTenantId,
    DataLakeExecutionId,
    DataLakeTenantCode,
    DataLakePayload,
    DataLakeCreatedAt,
    DataLakeUpdatedAt,
    DataLakeDeletedAt
    
} from './value-objects';
import { TenantMapper } from '@hades/admin/tenant/domain/tenant.mapper';
import { ExecutionMapper } from '@hades/cci/execution/domain/execution.mapper';



export class DataLakeMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}
    
    /**
     * Map object to aggregate
     * @param dataLake
     */
    mapModelToAggregate(dataLake: ObjectLiteral): CciDataLake
    {
        if (!dataLake) return;

        return this.makeAggregate(dataLake);
    }

    /**
     * Map array of objects to array aggregates
     * @param dataLakes 
     */
    mapModelsToAggregates(dataLakes: ObjectLiteral[]): CciDataLake[]
    {
        if (!Array.isArray(dataLakes)) return;
        
        return dataLakes.map(dataLake  => this.makeAggregate(dataLake));
    }

    /**
     * Map aggregate to response
     * @param dataLake 
     */
    mapAggregateToResponse(dataLake: CciDataLake): DataLakeResponse
    {
        return this.makeResponse(dataLake);
    }

    /**
     * Map array of aggregates to array responses
     * @param dataLakes
     */
    mapAggregatesToResponses(dataLakes: CciDataLake[]): DataLakeResponse[]
    {
        if (!Array.isArray(dataLakes)) return;

        return dataLakes.map(dataLake => this.makeResponse(dataLake));
    }

    private makeAggregate(dataLake: ObjectLiteral): CciDataLake
    {
        return CciDataLake.register(
            new DataLakeId(dataLake.id),
            new DataLakeTenantId(dataLake.tenantId),
            new DataLakeExecutionId(dataLake.executionId),
            new DataLakeTenantCode(dataLake.tenantCode),
            new DataLakePayload(dataLake.payload),
            new DataLakeCreatedAt(dataLake.createdAt),
            new DataLakeUpdatedAt(dataLake.updatedAt),
            new DataLakeDeletedAt(dataLake.deletedAt),
            
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapModelToAggregate(dataLake.tenant) : undefined,
            this.options.eagerLoading ? new ExecutionMapper({ eagerLoading: false }).mapModelToAggregate(dataLake.execution) : undefined,
            
            
            
        );
    }

    private makeResponse(dataLake: CciDataLake): DataLakeResponse
    {
        if (!dataLake) return;
        
        return new DataLakeResponse(
            dataLake.id.value,
            dataLake.tenantId.value,
            dataLake.executionId.value,
            dataLake.tenantCode.value,
            dataLake.payload.value,
            dataLake.createdAt.value,
            dataLake.updatedAt.value,
            dataLake.deletedAt.value,
            
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapAggregateToResponse(dataLake.tenant) : undefined,
            this.options.eagerLoading ? new ExecutionMapper({ eagerLoading: false }).mapAggregateToResponse(dataLake.execution) : undefined,
            
            
            
        );
    }
}