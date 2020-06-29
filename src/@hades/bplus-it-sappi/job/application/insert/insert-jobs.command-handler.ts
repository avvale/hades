import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertJobsCommand } from './insert-jobs.command';
import { InsertJobsService } from './insert-jobs.service';
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
    JobError
    
} from './../../domain/value-objects';

@CommandHandler(InsertJobsCommand)
export class InsertJobsCommandHandler implements ICommandHandler<InsertJobsCommand>
{
    constructor(
        private readonly insertJobsService: InsertJobsService
    ) { }

    async execute(command: InsertJobsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertJobsService.main(
            command.jobs
                .map(job => { 
                    return {
                        id: new JobId(job.id),
                        tenantId: new JobTenantId(job.tenantId),
                        systemId: new JobSystemId(job.systemId),
                        systemName: new JobSystemName(job.systemName),
                        executionId: new JobExecutionId(job.executionId),
                        executionType: new JobExecutionType(job.executionType),
                        executionExecutedAt: new JobExecutionExecutedAt(job.executionExecutedAt),
                        executionMonitoringStartAt: new JobExecutionMonitoringStartAt(job.executionMonitoringStartAt),
                        executionMonitoringEndAt: new JobExecutionMonitoringEndAt(job.executionMonitoringEndAt),
                        cancelled: new JobCancelled(job.cancelled),
                        completed: new JobCompleted(job.completed),
                        error: new JobError(job.error),
                        
                    }
                })
        );
    }
}