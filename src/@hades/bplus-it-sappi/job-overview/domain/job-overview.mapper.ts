import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiJobOverview } from './job-overview.aggregate';
import { JobOverviewResponse } from './job-overview.response';
import { 
    JobOverviewId, 
    JobOverviewTenantId, 
    JobOverviewSystemId, 
    JobOverviewSystemName, 
    JobOverviewExecutionId, 
    JobOverviewExecutionType, 
    JobOverviewExecutionExecutedAt, 
    JobOverviewExecutionMonitoringStartAt, 
    JobOverviewExecutionMonitoringEndAt, 
    JobOverviewCancelled, 
    JobOverviewCompleted, 
    JobOverviewError, 
    JobOverviewCreatedAt, 
    JobOverviewUpdatedAt, 
    JobOverviewDeletedAt
    
} from './value-objects';

export class JobOverviewMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param jobOverview
     */
    mapObjectToAggregate(jobOverview: ObjectLiteral): BplusItSappiJobOverview
    {
        return this.makeAggregate(jobOverview);
    }

    /**
     * Map array of objects to array aggregates
     * @param jobsOverview 
     */
    mapObjectsToAggregates(jobsOverview: ObjectLiteral[]): BplusItSappiJobOverview[]
    {
        return jobsOverview.map(jobOverview  => this.makeAggregate(jobOverview ));
    }

    /**
     * Map aggregate to response
     * @param jobOverview 
     */
    mapAggregateToResponse(jobOverview: BplusItSappiJobOverview): JobOverviewResponse
    {
        return this.makeResponse(jobOverview);
    }

    /**
     * Map array of aggregates to array responses
     * @param jobsOverview
     */
    mapAggregatesToResponses(jobsOverview: BplusItSappiJobOverview[]): JobOverviewResponse[]
    {
        return jobsOverview.map(jobOverview => this.makeResponse(jobOverview));
    }

    private makeAggregate(jobOverview: ObjectLiteral): BplusItSappiJobOverview
    {
        return BplusItSappiJobOverview.register(
            new JobOverviewId(jobOverview.id),
            new JobOverviewTenantId(jobOverview.tenantId),
            new JobOverviewSystemId(jobOverview.systemId),
            new JobOverviewSystemName(jobOverview.systemName),
            new JobOverviewExecutionId(jobOverview.executionId),
            new JobOverviewExecutionType(jobOverview.executionType),
            new JobOverviewExecutionExecutedAt(jobOverview.executionExecutedAt),
            new JobOverviewExecutionMonitoringStartAt(jobOverview.executionMonitoringStartAt),
            new JobOverviewExecutionMonitoringEndAt(jobOverview.executionMonitoringEndAt),
            new JobOverviewCancelled(jobOverview.cancelled),
            new JobOverviewCompleted(jobOverview.completed),
            new JobOverviewError(jobOverview.error),
            new JobOverviewCreatedAt(jobOverview.createdAt),
            new JobOverviewUpdatedAt(jobOverview.updatedAt),
            new JobOverviewDeletedAt(jobOverview.deletedAt),
              
        );
    }

    private makeResponse(jobOverview: BplusItSappiJobOverview): JobOverviewResponse
    {
        return new JobOverviewResponse(
            jobOverview.id.value,
            jobOverview.tenantId.value,
            jobOverview.systemId.value,
            jobOverview.systemName.value,
            jobOverview.executionId.value,
            jobOverview.executionType.value,
            jobOverview.executionExecutedAt.value,
            jobOverview.executionMonitoringStartAt.value,
            jobOverview.executionMonitoringEndAt.value,
            jobOverview.cancelled.value,
            jobOverview.completed.value,
            jobOverview.error.value,
            jobOverview.createdAt.value,
            jobOverview.updatedAt.value,
            jobOverview.deletedAt.value,
            
        );
    }
}