import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { CciJobDetail } from './job-detail.aggregate';
import { JobDetailResponse } from './job-detail.response';
import { 
    JobDetailId,
    JobDetailTenantId,
    JobDetailTenantCode,
    JobDetailSystemId,
    JobDetailSystemName,
    JobDetailExecutionId,
    JobDetailExecutionType,
    JobDetailExecutionExecutedAt,
    JobDetailExecutionMonitoringStartAt,
    JobDetailExecutionMonitoringEndAt,
    JobDetailStatus,
    JobDetailName,
    JobDetailReturnCode,
    JobDetailNode,
    JobDetailUser,
    JobDetailStartAt,
    JobDetailEndAt,
    JobDetailCreatedAt,
    JobDetailUpdatedAt,
    JobDetailDeletedAt
    
} from './value-objects';
import { TenantMapper } from '@hades/admin/tenant/domain/tenant.mapper';
import { SystemMapper } from '@hades/cci/system/domain/system.mapper';
import { ExecutionMapper } from '@hades/cci/execution/domain/execution.mapper';



export class JobDetailMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}
    
    /**
     * Map object to aggregate
     * @param jobDetail
     */
    mapModelToAggregate(jobDetail: ObjectLiteral): CciJobDetail
    {
        if (!jobDetail) return;

        return this.makeAggregate(jobDetail);
    }

    /**
     * Map array of objects to array aggregates
     * @param jobsDetail 
     */
    mapModelsToAggregates(jobsDetail: ObjectLiteral[]): CciJobDetail[]
    {
        if (!Array.isArray(jobsDetail)) return;
        
        return jobsDetail.map(jobDetail  => this.makeAggregate(jobDetail));
    }

    /**
     * Map aggregate to response
     * @param jobDetail 
     */
    mapAggregateToResponse(jobDetail: CciJobDetail): JobDetailResponse
    {
        return this.makeResponse(jobDetail);
    }

    /**
     * Map array of aggregates to array responses
     * @param jobsDetail
     */
    mapAggregatesToResponses(jobsDetail: CciJobDetail[]): JobDetailResponse[]
    {
        if (!Array.isArray(jobsDetail)) return;

        return jobsDetail.map(jobDetail => this.makeResponse(jobDetail));
    }

    private makeAggregate(jobDetail: ObjectLiteral): CciJobDetail
    {
        return CciJobDetail.register(
            new JobDetailId(jobDetail.id),
            new JobDetailTenantId(jobDetail.tenantId),
            new JobDetailTenantCode(jobDetail.tenantCode),
            new JobDetailSystemId(jobDetail.systemId),
            new JobDetailSystemName(jobDetail.systemName),
            new JobDetailExecutionId(jobDetail.executionId),
            new JobDetailExecutionType(jobDetail.executionType),
            new JobDetailExecutionExecutedAt(jobDetail.executionExecutedAt),
            new JobDetailExecutionMonitoringStartAt(jobDetail.executionMonitoringStartAt),
            new JobDetailExecutionMonitoringEndAt(jobDetail.executionMonitoringEndAt),
            new JobDetailStatus(jobDetail.status),
            new JobDetailName(jobDetail.name),
            new JobDetailReturnCode(jobDetail.returnCode),
            new JobDetailNode(jobDetail.node),
            new JobDetailUser(jobDetail.user),
            new JobDetailStartAt(jobDetail.startAt),
            new JobDetailEndAt(jobDetail.endAt),
            new JobDetailCreatedAt(jobDetail.createdAt),
            new JobDetailUpdatedAt(jobDetail.updatedAt),
            new JobDetailDeletedAt(jobDetail.deletedAt),
            
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapModelToAggregate(jobDetail.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapModelToAggregate(jobDetail.system) : undefined,
            this.options.eagerLoading ? new ExecutionMapper({ eagerLoading: false }).mapModelToAggregate(jobDetail.execution) : undefined,
            
            
            
        );
    }

    private makeResponse(jobDetail: CciJobDetail): JobDetailResponse
    {
        if (!jobDetail) return;
        
        return new JobDetailResponse(
            jobDetail.id.value,
            jobDetail.tenantId.value,
            jobDetail.tenantCode.value,
            jobDetail.systemId.value,
            jobDetail.systemName.value,
            jobDetail.executionId.value,
            jobDetail.executionType.value,
            jobDetail.executionExecutedAt.value,
            jobDetail.executionMonitoringStartAt.value,
            jobDetail.executionMonitoringEndAt.value,
            jobDetail.status.value,
            jobDetail.name.value,
            jobDetail.returnCode.value,
            jobDetail.node.value,
            jobDetail.user.value,
            jobDetail.startAt.value,
            jobDetail.endAt.value,
            jobDetail.createdAt.value,
            jobDetail.updatedAt.value,
            jobDetail.deletedAt.value,
            
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapAggregateToResponse(jobDetail.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapAggregateToResponse(jobDetail.system) : undefined,
            this.options.eagerLoading ? new ExecutionMapper({ eagerLoading: false }).mapAggregateToResponse(jobDetail.execution) : undefined,
            
            
            
        );
    }
}