import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJobOverviewCommand } from './create-job-overview.command';
import { CreateJobOverviewService } from './create-job-overview.service';
import {
    JobOverviewId,
    JobOverviewTenantId,
    JobOverviewTenantCode,
    JobOverviewSystemId,
    JobOverviewSystemName,
    JobOverviewExecutionId,
    JobOverviewExecutionType,
    JobOverviewExecutionExecutedAt,
    JobOverviewExecutionMonitoringStartAt,
    JobOverviewExecutionMonitoringEndAt,
    JobOverviewCancelled,
    JobOverviewCompleted,
    JobOverviewError,
    JobOverviewCreatedAt,
    JobOverviewUpdatedAt,
    JobOverviewDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(CreateJobOverviewCommand)
export class CreateJobOverviewCommandHandler implements ICommandHandler<CreateJobOverviewCommand>
{
    constructor(
        private readonly createJobOverviewService: CreateJobOverviewService,
    ) {}

    async execute(command: CreateJobOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createJobOverviewService.main(
            {
                id: new JobOverviewId(command.payload.id),
                tenantId: new JobOverviewTenantId(command.payload.tenantId),
                tenantCode: new JobOverviewTenantCode(command.payload.tenantCode),
                systemId: new JobOverviewSystemId(command.payload.systemId),
                systemName: new JobOverviewSystemName(command.payload.systemName),
                executionId: new JobOverviewExecutionId(command.payload.executionId),
                executionType: new JobOverviewExecutionType(command.payload.executionType),
                executionExecutedAt: new JobOverviewExecutionExecutedAt(command.payload.executionExecutedAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringStartAt: new JobOverviewExecutionMonitoringStartAt(command.payload.executionMonitoringStartAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringEndAt: new JobOverviewExecutionMonitoringEndAt(command.payload.executionMonitoringEndAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                cancelled: new JobOverviewCancelled(command.payload.cancelled),
                completed: new JobOverviewCompleted(command.payload.completed),
                error: new JobOverviewError(command.payload.error),
            }
        );
    }
}