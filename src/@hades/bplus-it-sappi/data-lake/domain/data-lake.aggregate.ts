import { AggregateRoot } from '@nestjs/cqrs';
import { 
    DataLakeId, 
    DataLakeExecutionId, 
    DataLakeTenantId, 
    DataLakeTenantCode, 
    DataLakePayload, 
    DataLakeCreatedAt, 
    DataLakeUpdatedAt, 
    DataLakeDeletedAt
    
} from './value-objects';
import { CreatedDataLakeEvent } from './../application/events/created-data-lake.event';
import { UpdatedDataLakeEvent } from './../application/events/updated-data-lake.event';
import { DeletedDataLakeEvent } from './../application/events/deleted-data-lake.event';
import { BplusItSappiExecution } from '@hades/bplus-it-sappi/execution/domain/execution.aggregate';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.aggregate';

export class BplusItSappiDataLake extends AggregateRoot
{
    id: DataLakeId;
    executionId: DataLakeExecutionId;
    tenantId: DataLakeTenantId;
    tenantCode: DataLakeTenantCode;
    payload: DataLakePayload;
    createdAt: DataLakeCreatedAt;
    updatedAt: DataLakeUpdatedAt;
    deletedAt: DataLakeDeletedAt;
    
    constructor(id?: DataLakeId, executionId?: DataLakeExecutionId, tenantId?: DataLakeTenantId, tenantCode?: DataLakeTenantCode, payload?: DataLakePayload, createdAt?: DataLakeCreatedAt, updatedAt?: DataLakeUpdatedAt, deletedAt?: DataLakeDeletedAt, )
    {
        super();
        
        this.id = id;
        this.executionId = executionId;
        this.tenantId = tenantId;
        this.tenantCode = tenantCode;
        this.payload = payload;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: DataLakeId, executionId: DataLakeExecutionId, tenantId: DataLakeTenantId, tenantCode: DataLakeTenantCode, payload: DataLakePayload, createdAt: DataLakeCreatedAt, updatedAt: DataLakeUpdatedAt, deletedAt: DataLakeDeletedAt, ): BplusItSappiDataLake
    {
        return new BplusItSappiDataLake(id, executionId, tenantId, tenantCode, payload, createdAt, updatedAt, deletedAt, );
    }

    created(dataLake: BplusItSappiDataLake): void
    {
        this.apply(
            new CreatedDataLakeEvent(
                dataLake.id.value,
                dataLake.executionId.value,
                dataLake.tenantId.value,
                dataLake.tenantCode.value,
                dataLake.payload.value,
                dataLake.createdAt?.value,
                dataLake.updatedAt?.value,
                dataLake.deletedAt?.value,
                
            )
        );
    }

    updated(dataLake: BplusItSappiDataLake): void
    {
        this.apply(
            new UpdatedDataLakeEvent(
                dataLake.id.value,
                dataLake.executionId?.value,
                dataLake.tenantId?.value,
                dataLake.tenantCode?.value,
                dataLake.payload?.value,
                dataLake.createdAt?.value,
                dataLake.updatedAt?.value,
                dataLake.deletedAt?.value,
                
            )
        );
    }

    deleted(dataLake: BplusItSappiDataLake): void
    {
        this.apply(
            new DeletedDataLakeEvent(
                dataLake.id.value,
                dataLake.executionId.value,
                dataLake.tenantId.value,
                dataLake.tenantCode.value,
                dataLake.payload.value,
                dataLake.createdAt?.value,
                dataLake.updatedAt?.value,
                dataLake.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            executionId: this.executionId.value,
            tenantId: this.tenantId.value,
            tenantCode: this.tenantCode.value,
            payload: this.payload.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
