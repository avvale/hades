import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertJobsOverviewCommand } from './insert-jobs-overview.command';
import { InsertJobsOverviewService } from './insert-jobs-overview.service';
import { 
    JobOverviewId, 
    JobOverviewTenantId, 
    JobOverviewSystemId, 
    JobOverviewExecutionType, 
    JobOverviewExecutionExecutedAt, 
    JobOverviewExecutionMonitoringStartAt, 
    JobOverviewExecutionMonitoringEndAt, 
    JobOverviewCancelled, 
    JobOverviewCompleted, 
    JobOverviewError
    
} from './../../domain/value-objects';

@CommandHandler(InsertJobsOverviewCommand)
export class InsertJobsOverviewCommandHandler implements ICommandHandler<InsertJobsOverviewCommand>
{
    constructor(
        private readonly insertJobsOverviewService: InsertJobsOverviewService
    ) { }

    async execute(command: InsertJobsOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertJobsOverviewService.main(
            command.jobsOverview
                .map(jobOverview => { 
                    return {
                        id: new JobOverviewId(jobOverview.id),
                        tenantId: new JobOverviewTenantId(jobOverview.tenantId),
                        systemId: new JobOverviewSystemId(jobOverview.systemId),
                        executionType: new JobOverviewExecutionType(jobOverview.executionType),
                        executionExecutedAt: new JobOverviewExecutionExecutedAt(jobOverview.executionExecutedAt),
                        executionMonitoringStartAt: new JobOverviewExecutionMonitoringStartAt(jobOverview.executionMonitoringStartAt),
                        executionMonitoringEndAt: new JobOverviewExecutionMonitoringEndAt(jobOverview.executionMonitoringEndAt),
                        cancelled: new JobOverviewCancelled(jobOverview.cancelled),
                        completed: new JobOverviewCompleted(jobOverview.completed),
                        error: new JobOverviewError(jobOverview.error),
                        
                    }
                })
        );
    }
}