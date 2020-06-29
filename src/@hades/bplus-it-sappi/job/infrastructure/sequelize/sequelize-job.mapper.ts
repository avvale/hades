import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiJob } from './../../domain/job.entity';
import { 
    JobId, 
    JobTenantId, 
    JobSystemId, 
    JobSystemName, 
    JobExecutionId, 
    JobExecutionType, 
    JobExecutionExecutedAt, 
    JobExecutionMonitoringStartAt, 
    JobExecutionMonitoringEndAt, 
    JobCancelled, 
    JobCompleted, 
    JobError, 
    JobCreatedAt, 
    JobUpdatedAt, 
    JobDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeJobMapper implements SequelizeMapper
{
    mapToEntity(job: ObjectLiteral | ObjectLiteral[]): BplusItSappiJob | BplusItSappiJob[]
    {
        if (Array.isArray(job))
        {
            return job.map(item => BplusItSappiJob.register(
                    new JobId(item.id),
                    new JobTenantId(item.tenantId),
                    new JobSystemId(item.systemId),
                    new JobSystemName(item.systemName),
                    new JobExecutionId(item.executionId),
                    new JobExecutionType(item.executionType),
                    new JobExecutionExecutedAt(item.executionExecutedAt),
                    new JobExecutionMonitoringStartAt(item.executionMonitoringStartAt),
                    new JobExecutionMonitoringEndAt(item.executionMonitoringEndAt),
                    new JobCancelled(item.cancelled),
                    new JobCompleted(item.completed),
                    new JobError(item.error),
                    new JobCreatedAt(item.createdAt),
                    new JobUpdatedAt(item.updatedAt),
                    new JobDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return BplusItSappiJob.register(
            new JobId(job.id),
            new JobTenantId(job.tenantId),
            new JobSystemId(job.systemId),
            new JobSystemName(job.systemName),
            new JobExecutionId(job.executionId),
            new JobExecutionType(job.executionType),
            new JobExecutionExecutedAt(job.executionExecutedAt),
            new JobExecutionMonitoringStartAt(job.executionMonitoringStartAt),
            new JobExecutionMonitoringEndAt(job.executionMonitoringEndAt),
            new JobCancelled(job.cancelled),
            new JobCompleted(job.completed),
            new JobError(job.error),
            new JobCreatedAt(job.createdAt),
            new JobUpdatedAt(job.updatedAt),
            new JobDeletedAt(job.deletedAt),
            
        );
    }
}