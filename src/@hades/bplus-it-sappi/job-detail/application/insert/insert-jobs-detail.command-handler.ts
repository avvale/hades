import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertJobsDetailCommand } from './insert-jobs-detail.command';
import { InsertJobsDetailService } from './insert-jobs-detail.service';
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
    JobDetailExample
    
} from './../../domain/value-objects';

@CommandHandler(InsertJobsDetailCommand)
export class InsertJobsDetailCommandHandler implements ICommandHandler<InsertJobsDetailCommand>
{
    constructor(
        private readonly insertJobsDetailService: InsertJobsDetailService
    ) { }

    async execute(command: InsertJobsDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertJobsDetailService.main(
            command.jobsDetail
                .map(jobDetail => { 
                    return {
                        id: new JobDetailId(jobDetail.id),
                        tenantId: new JobDetailTenantId(jobDetail.tenantId),
                        systemId: new JobDetailSystemId(jobDetail.systemId),
                        systemName: new JobDetailSystemName(jobDetail.systemName),
                        executionId: new JobDetailExecutionId(jobDetail.executionId),
                        executionType: new JobDetailExecutionType(jobDetail.executionType),
                        executionExecutedAt: new JobDetailExecutionExecutedAt(jobDetail.executionExecutedAt),
                        executionMonitoringStartAt: new JobDetailExecutionMonitoringStartAt(jobDetail.executionMonitoringStartAt),
                        executionMonitoringEndAt: new JobDetailExecutionMonitoringEndAt(jobDetail.executionMonitoringEndAt),
                        status: new JobDetailStatus(jobDetail.status),
                        detail: new JobDetailDetail(jobDetail.detail),
                        example: new JobDetailExample(jobDetail.example),
                        
                    }
                })
        );
    }
}