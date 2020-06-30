import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateJobOverviewCommand } from './update-job-overview.command';
import { UpdateJobOverviewService } from './update-job-overview.service';
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

@CommandHandler(UpdateJobOverviewCommand)
export class UpdateJobOverviewCommandHandler implements ICommandHandler<UpdateJobOverviewCommand>
{
    constructor(
        private readonly updateJobOverviewService: UpdateJobOverviewService
    ) { }

    async execute(command: UpdateJobOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateJobOverviewService.main(
            new JobOverviewId(command.id),
            new JobOverviewTenantId(command.tenantId, { undefinable: true }),
            new JobOverviewSystemId(command.systemId, { undefinable: true }),
            new JobOverviewExecutionType(command.executionType, { undefinable: true }),
            new JobOverviewExecutionExecutedAt(command.executionExecutedAt, { undefinable: true }),
            new JobOverviewExecutionMonitoringStartAt(command.executionMonitoringStartAt, { undefinable: true }),
            new JobOverviewExecutionMonitoringEndAt(command.executionMonitoringEndAt, { undefinable: true }),
            new JobOverviewCancelled(command.cancelled),
            new JobOverviewCompleted(command.completed),
            new JobOverviewError(command.error),
            
        )
    }
}