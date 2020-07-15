import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiJobDetail } from './job-detail.aggregate';
import { JobDetailResponse } from './job-detail.response';
import { 
    JobDetailId, 
    JobDetailTenantId, 
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
    JobDetailCreatedAt, 
    JobDetailUpdatedAt, 
    JobDetailDeletedAt
    
} from './value-objects';

export class JobDetailMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param jobDetail
     */
    mapObjectToAggregate(jobDetail: ObjectLiteral): BplusItSappiJobDetail
    {
        return this.makeAggregate(jobDetail);
    }

    /**
     * Map array of objects to array aggregates
     * @param jobsDetail 
     */
    mapObjectsToAggregates(jobsDetail: ObjectLiteral[]): BplusItSappiJobDetail[]
    {
        return jobsDetail.map(jobDetail  => this.makeAggregate(jobDetail ));
    }

    /**
     * Map aggregate to response
     * @param jobDetail 
     */
    mapAggregateToResponse(jobDetail: BplusItSappiJobDetail): JobDetailResponse
    {
        return this.makeResponse(jobDetail);
    }

    /**
     * Map array of aggregates to array responses
     * @param jobsDetail
     */
    mapAggregatesToResponses(jobsDetail: BplusItSappiJobDetail[]): JobDetailResponse[]
    {
        return jobsDetail.map(jobDetail => this.makeResponse(jobDetail));
    }

    private makeAggregate(jobDetail: ObjectLiteral): BplusItSappiJobDetail
    {
        return BplusItSappiJobDetail.register(
            new JobDetailId(jobDetail.id),
            new JobDetailTenantId(jobDetail.tenantId),
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
            new JobDetailCreatedAt(jobDetail.createdAt),
            new JobDetailUpdatedAt(jobDetail.updatedAt),
            new JobDetailDeletedAt(jobDetail.deletedAt),
              
        );
    }

    private makeResponse(jobDetail: BplusItSappiJobDetail): JobDetailResponse
    {
        return new JobDetailResponse(
            jobDetail.id.value,
            jobDetail.tenantId.value,
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
            jobDetail.createdAt.value,
            jobDetail.updatedAt.value,
            jobDetail.deletedAt.value,
            
        );
    }
}