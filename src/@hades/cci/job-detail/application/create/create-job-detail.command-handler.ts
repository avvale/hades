import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJobDetailCommand } from './create-job-detail.command';
import { CreateJobDetailService } from './create-job-detail.service';
import { 
    JobDetailId,
    JobDetailTenantId,
    JobDetailTenantCode,
    JobDetailSystemId,
    JobDetailSystemName,
    JobDetailExecutionId,
    JobDetailExecutionType,
    JobDetailExecutionExecutedAt,
    JobDetailExecutionMonitoringStartAt,
    JobDetailExecutionMonitoringEndAt,
    JobDetailStatus,
    JobDetailName,
    JobDetailReturnCode,
    JobDetailNode,
    JobDetailUser,
    JobDetailStartAt,
    JobDetailEndAt
    
} from './../../domain/value-objects';

@CommandHandler(CreateJobDetailCommand)
export class CreateJobDetailCommandHandler implements ICommandHandler<CreateJobDetailCommand>
{
    constructor(
        private readonly createJobDetailService: CreateJobDetailService
    ) { }

    async execute(command: CreateJobDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createJobDetailService.main(
            new JobDetailId(command.id),
            new JobDetailTenantId(command.tenantId),
            new JobDetailTenantCode(command.tenantCode),
            new JobDetailSystemId(command.systemId),
            new JobDetailSystemName(command.systemName),
            new JobDetailExecutionId(command.executionId),
            new JobDetailExecutionType(command.executionType),
            new JobDetailExecutionExecutedAt(command.executionExecutedAt),
            new JobDetailExecutionMonitoringStartAt(command.executionMonitoringStartAt),
            new JobDetailExecutionMonitoringEndAt(command.executionMonitoringEndAt),
            new JobDetailStatus(command.status),
            new JobDetailName(command.name),
            new JobDetailReturnCode(command.returnCode),
            new JobDetailNode(command.node),
            new JobDetailUser(command.user),
            new JobDetailStartAt(command.startAt),
            new JobDetailEndAt(command.endAt),
            
        );
    }
}