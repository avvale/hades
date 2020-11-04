import { AggregateRoot } from '@nestjs/cqrs';
import {
    DataLakeId,
    DataLakeTenantId,
    DataLakeExecutionId,
    DataLakeTenantCode,
    DataLakePayload,
    DataLakeCreatedAt,
    DataLakeUpdatedAt,
    DataLakeDeletedAt,
} from './value-objects';
import { CreatedDataLakeEvent } from './../application/events/created-data-lake.event';
import { UpdatedDataLakeEvent } from './../application/events/updated-data-lake.event';
import { DeletedDataLakeEvent } from './../application/events/deleted-data-lake.event';
import { IamTenant } from '@hades/iam/tenant/domain/tenant.aggregate';
import { CciExecution } from '@hades/cci/execution/domain/execution.aggregate';

export class CciDataLake extends AggregateRoot
{
    id: DataLakeId;
    tenantId: DataLakeTenantId;
    executionId: DataLakeExecutionId;
    tenantCode: DataLakeTenantCode;
    payload: DataLakePayload;
    createdAt: DataLakeCreatedAt;
    updatedAt: DataLakeUpdatedAt;
    deletedAt: DataLakeDeletedAt;

    // eager relationship
    tenant: IamTenant;
    execution: CciExecution;

    constructor(id?: DataLakeId, tenantId?: DataLakeTenantId, executionId?: DataLakeExecutionId, tenantCode?: DataLakeTenantCode, payload?: DataLakePayload, createdAt?: DataLakeCreatedAt, updatedAt?: DataLakeUpdatedAt, deletedAt?: DataLakeDeletedAt, tenant?: IamTenant, execution?: CciExecution, )
    {
        super();

        this.id = id;
        this.tenantId = tenantId;
        this.executionId = executionId;
        this.tenantCode = tenantCode;
        this.payload = payload;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.tenant = tenant;
        this.execution = execution;
    }

    static register (id: DataLakeId, tenantId: DataLakeTenantId, executionId: DataLakeExecutionId, tenantCode: DataLakeTenantCode, payload: DataLakePayload, createdAt: DataLakeCreatedAt, updatedAt: DataLakeUpdatedAt, deletedAt: DataLakeDeletedAt, tenant?: IamTenant, execution?: CciExecution, ): CciDataLake
    {
        return new CciDataLake(id, tenantId, executionId, tenantCode, payload, createdAt, updatedAt, deletedAt, tenant, execution, );
    }

    created(dataLake: CciDataLake): void
    {
        this.apply(
            new CreatedDataLakeEvent(
                dataLake.id.value,
                dataLake.tenantId.value,
                dataLake.executionId.value,
                dataLake.tenantCode.value,
                dataLake.payload.value,
                dataLake.createdAt?.value,
                dataLake.updatedAt?.value,
                dataLake.deletedAt?.value,
                
            )
        );
    }

    updated(dataLake: CciDataLake): void
    {
        this.apply(
            new UpdatedDataLakeEvent(
                dataLake.id.value,
                dataLake.tenantId?.value,
                dataLake.executionId?.value,
                dataLake.tenantCode?.value,
                dataLake.payload?.value,
                dataLake.createdAt?.value,
                dataLake.updatedAt?.value,
                dataLake.deletedAt?.value,
                
            )
        );
    }

    deleted(dataLake: CciDataLake): void
    {
        this.apply(
            new DeletedDataLakeEvent(
                dataLake.id.value,
                dataLake.tenantId.value,
                dataLake.executionId.value,
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
            tenantId: this.tenantId.value,
            executionId: this.executionId.value,
            tenantCode: this.tenantCode.value,
            payload: this.payload.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            tenant: this.tenant?.toDTO(),
            execution: this.execution?.toDTO(),
        }
    }
}
