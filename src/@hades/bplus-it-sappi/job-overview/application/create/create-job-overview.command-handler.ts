import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJobOverviewCommand } from './create-job-overview.command';
import { CreateJobOverviewService } from './create-job-overview.service';
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

@CommandHandler(CreateJobOverviewCommand)
export class CreateJobOverviewCommandHandler implements ICommandHandler<CreateJobOverviewCommand>
{
    constructor(
        private readonly createJobOverviewService: CreateJobOverviewService
    ) { }

    async execute(command: CreateJobOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createJobOverviewService.main(
            new JobOverviewId(command.id),
            new JobOverviewTenantId(command.tenantId),
            new JobOverviewSystemId(command.systemId),
            new JobOverviewExecutionType(command.executionType),
            new JobOverviewExecutionExecutedAt(command.executionExecutedAt),
            new JobOverviewExecutionMonitoringStartAt(command.executionMonitoringStartAt),
            new JobOverviewExecutionMonitoringEndAt(command.executionMonitoringEndAt),
            new JobOverviewCancelled(command.cancelled),
            new JobOverviewCompleted(command.completed),
            new JobOverviewError(command.error),
            
        );
    }
}