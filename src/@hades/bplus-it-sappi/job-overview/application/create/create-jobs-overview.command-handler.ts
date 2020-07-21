import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJobsOverviewCommand } from './create-jobs-overview.command';
import { CreateJobsOverviewService } from './create-jobs-overview.service';
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
    JobOverviewError
    
} from './../../domain/value-objects';

@CommandHandler(CreateJobsOverviewCommand)
export class CreateJobsOverviewCommandHandler implements ICommandHandler<CreateJobsOverviewCommand>
{
    constructor(
        private readonly createJobsOverviewService: CreateJobsOverviewService
    ) { }

    async execute(command: CreateJobsOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createJobsOverviewService.main(
            command.jobsOverview
                .map(jobOverview => { 
                    return {
                        id: new JobOverviewId(jobOverview.id),
                        tenantId: new JobOverviewTenantId(jobOverview.tenantId),
                        systemId: new JobOverviewSystemId(jobOverview.systemId),
                        systemName: new JobOverviewSystemName(jobOverview.systemName),
                        executionId: new JobOverviewExecutionId(jobOverview.executionId),
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