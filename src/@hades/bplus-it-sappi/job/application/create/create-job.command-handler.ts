import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJobCommand } from './create-job.command';
import { CreateJobService } from './create-job.service';
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

@CommandHandler(CreateJobCommand)
export class CreateJobCommandHandler implements ICommandHandler<CreateJobCommand>
{
    constructor(
        private readonly createJobService: CreateJobService
    ) { }

    async execute(command: CreateJobCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createJobService.main(
            new JobId(command.id),
            new JobTenantId(command.tenantId),
            new JobSystemId(command.systemId),
            new JobSystemName(command.systemName),
            new JobExecutionId(command.executionId),
            new JobExecutionType(command.executionType),
            new JobExecutionExecutedAt(command.executionExecutedAt),
            new JobExecutionMonitoringStartAt(command.executionMonitoringStartAt),
            new JobExecutionMonitoringEndAt(command.executionMonitoringEndAt),
            new JobCancelled(command.cancelled),
            new JobCompleted(command.completed),
            new JobError(command.error),
            
        );
    }
}