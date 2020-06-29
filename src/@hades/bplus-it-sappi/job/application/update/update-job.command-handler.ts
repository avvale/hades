import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateJobCommand } from './update-job.command';
import { UpdateJobService } from './update-job.service';
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

@CommandHandler(UpdateJobCommand)
export class UpdateJobCommandHandler implements ICommandHandler<UpdateJobCommand>
{
    constructor(
        private readonly updateJobService: UpdateJobService
    ) { }

    async execute(command: UpdateJobCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateJobService.main(
            new JobId(command.id),
            new JobTenantId(command.tenantId, { undefinable: true }),
            new JobSystemId(command.systemId, { undefinable: true }),
            new JobSystemName(command.systemName, { undefinable: true }),
            new JobExecutionId(command.executionId, { undefinable: true }),
            new JobExecutionType(command.executionType, { undefinable: true }),
            new JobExecutionExecutedAt(command.executionExecutedAt, { undefinable: true }),
            new JobExecutionMonitoringStartAt(command.executionMonitoringStartAt, { undefinable: true }),
            new JobExecutionMonitoringEndAt(command.executionMonitoringEndAt, { undefinable: true }),
            new JobCancelled(command.cancelled),
            new JobCompleted(command.completed),
            new JobError(command.error),
            
        )
    }
}