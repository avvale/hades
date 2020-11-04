import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateJobOverviewCommand } from './update-job-overview.command';
import { UpdateJobOverviewService } from './update-job-overview.service';
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

@CommandHandler(UpdateJobOverviewCommand)
export class UpdateJobOverviewCommandHandler implements ICommandHandler<UpdateJobOverviewCommand>
{
    constructor(
        private readonly updateJobOverviewService: UpdateJobOverviewService,
    ) {}

    async execute(command: UpdateJobOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateJobOverviewService.main(
            {
                id: new JobOverviewId(command.payload.id),
                tenantId: new JobOverviewTenantId(command.payload.tenantId, { undefinable: true }),
                tenantCode: new JobOverviewTenantCode(command.payload.tenantCode, { undefinable: true }),
                systemId: new JobOverviewSystemId(command.payload.systemId, { undefinable: true }),
                systemName: new JobOverviewSystemName(command.payload.systemName, { undefinable: true }),
                executionId: new JobOverviewExecutionId(command.payload.executionId, { undefinable: true }),
                executionType: new JobOverviewExecutionType(command.payload.executionType, { undefinable: true }),
                executionExecutedAt: new JobOverviewExecutionExecutedAt(command.payload.executionExecutedAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringStartAt: new JobOverviewExecutionMonitoringStartAt(command.payload.executionMonitoringStartAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringEndAt: new JobOverviewExecutionMonitoringEndAt(command.payload.executionMonitoringEndAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                cancelled: new JobOverviewCancelled(command.payload.cancelled),
                completed: new JobOverviewCompleted(command.payload.completed),
                error: new JobOverviewError(command.payload.error),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}