import { AggregateRoot } from '@nestjs/cqrs';
import { 
    DataLakeId, 
    DataLakeTenantId, 
    DataLakeTenantCode, 
    DataLakeData, 
    DataLakeCreatedAt, 
    DataLakeUpdatedAt, 
    DataLakeDeletedAt
    
} from './value-objects';
import { CreatedDataLakeEvent } from './../application/events/created-data-lake.event';
import { UpdatedDataLakeEvent } from './../application/events/updated-data-lake.event';
import { DeletedDataLakeEvent } from './../application/events/deleted-data-lake.event';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.aggregate';

export class BplusItSappiDataLake extends AggregateRoot
{
    id: DataLakeId;
    tenantId: DataLakeTenantId;
    tenant: AdminTenant;
    tenantCode: DataLakeTenantCode;
    data: DataLakeData;
    createdAt: DataLakeCreatedAt;
    updatedAt: DataLakeUpdatedAt;
    deletedAt: DataLakeDeletedAt;
    
    constructor(id?: DataLakeId, tenantId?: DataLakeTenantId, tenantCode?: DataLakeTenantCode, data?: DataLakeData, createdAt?: DataLakeCreatedAt, updatedAt?: DataLakeUpdatedAt, deletedAt?: DataLakeDeletedAt, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.tenantCode = tenantCode;
        this.data = data;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: DataLakeId, tenantId: DataLakeTenantId, tenantCode: DataLakeTenantCode, data: DataLakeData, createdAt: DataLakeCreatedAt, updatedAt: DataLakeUpdatedAt, deletedAt: DataLakeDeletedAt, ): BplusItSappiDataLake
    {
        return new BplusItSappiDataLake(id, tenantId, tenantCode, data, createdAt, updatedAt, deletedAt, );
    }

    created(dataLake: BplusItSappiDataLake): void
    {
        this.apply(
            new CreatedDataLakeEvent(
                dataLake.id.value,
                dataLake.tenantId.value,
                dataLake.tenantCode.value,
                dataLake.data.value,
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
                dataLake.tenantId?.value,
                dataLake.tenantCode?.value,
                dataLake.data?.value,
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
                dataLake.tenantId.value,
                dataLake.tenantCode.value,
                dataLake.data.value,
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
            tenantId: this.tenantId.value,
            tenantCode: this.tenantCode.value,
            data: this.data.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
