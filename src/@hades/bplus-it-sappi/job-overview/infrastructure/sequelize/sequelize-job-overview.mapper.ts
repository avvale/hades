import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiJobOverview } from './../../domain/job-overview.entity';
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
    
} from './../../domain/value-objects';

export class SequelizeJobOverviewMapper implements SequelizeMapper
{
    mapToAggregate(jobOverview: ObjectLiteral | ObjectLiteral[]): BplusItSappiJobOverview | BplusItSappiJobOverview[]
    {
        if (Array.isArray(jobOverview))
        {
            return jobOverview.map(item => BplusItSappiJobOverview.register(
                    new JobOverviewId(item.id),
                    new JobOverviewTenantId(item.tenantId),
                    new JobOverviewSystemId(item.systemId),
                    new JobOverviewSystemName(item.systemName),
                    new JobOverviewExecutionId(item.executionId),
                    new JobOverviewExecutionType(item.executionType),
                    new JobOverviewExecutionExecutedAt(item.executionExecutedAt),
                    new JobOverviewExecutionMonitoringStartAt(item.executionMonitoringStartAt),
                    new JobOverviewExecutionMonitoringEndAt(item.executionMonitoringEndAt),
                    new JobOverviewCancelled(item.cancelled),
                    new JobOverviewCompleted(item.completed),
                    new JobOverviewError(item.error),
                    new JobOverviewCreatedAt(item.createdAt),
                    new JobOverviewUpdatedAt(item.updatedAt),
                    new JobOverviewDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
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
}