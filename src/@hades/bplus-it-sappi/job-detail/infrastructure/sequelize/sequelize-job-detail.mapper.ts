import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiJobDetail } from './../../domain/job-detail.entity';
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
    JobDetailDetail, 
    JobDetailExample, 
    JobDetailCreatedAt, 
    JobDetailUpdatedAt, 
    JobDetailDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeJobDetailMapper implements SequelizeMapper
{
    mapToEntity(jobDetail: ObjectLiteral | ObjectLiteral[]): BplusItSappiJobDetail | BplusItSappiJobDetail[]
    {
        if (Array.isArray(jobDetail))
        {
            return jobDetail.map(item => BplusItSappiJobDetail.register(
                    new JobDetailId(item.id),
                    new JobDetailTenantId(item.tenantId),
                    new JobDetailSystemId(item.systemId),
                    new JobDetailSystemName(item.systemName),
                    new JobDetailExecutionId(item.executionId),
                    new JobDetailExecutionType(item.executionType),
                    new JobDetailExecutionExecutedAt(item.executionExecutedAt),
                    new JobDetailExecutionMonitoringStartAt(item.executionMonitoringStartAt),
                    new JobDetailExecutionMonitoringEndAt(item.executionMonitoringEndAt),
                    new JobDetailStatus(item.status),
                    new JobDetailDetail(item.detail),
                    new JobDetailExample(item.example),
                    new JobDetailCreatedAt(item.createdAt),
                    new JobDetailUpdatedAt(item.updatedAt),
                    new JobDetailDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
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
            new JobDetailDetail(jobDetail.detail),
            new JobDetailExample(jobDetail.example),
            new JobDetailCreatedAt(jobDetail.createdAt),
            new JobDetailUpdatedAt(jobDetail.updatedAt),
            new JobDetailDeletedAt(jobDetail.deletedAt),
            
        );
    }
}