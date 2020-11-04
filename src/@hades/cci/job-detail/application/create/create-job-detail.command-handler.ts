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
    JobDetailEndAt,
    JobDetailCreatedAt,
    JobDetailUpdatedAt,
    JobDetailDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(CreateJobDetailCommand)
export class CreateJobDetailCommandHandler implements ICommandHandler<CreateJobDetailCommand>
{
    constructor(
        private readonly createJobDetailService: CreateJobDetailService,
    ) {}

    async execute(command: CreateJobDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createJobDetailService.main(
            {
                id: new JobDetailId(command.payload.id),
                tenantId: new JobDetailTenantId(command.payload.tenantId),
                tenantCode: new JobDetailTenantCode(command.payload.tenantCode),
                systemId: new JobDetailSystemId(command.payload.systemId),
                systemName: new JobDetailSystemName(command.payload.systemName),
                executionId: new JobDetailExecutionId(command.payload.executionId),
                executionType: new JobDetailExecutionType(command.payload.executionType),
                executionExecutedAt: new JobDetailExecutionExecutedAt(command.payload.executionExecutedAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringStartAt: new JobDetailExecutionMonitoringStartAt(command.payload.executionMonitoringStartAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringEndAt: new JobDetailExecutionMonitoringEndAt(command.payload.executionMonitoringEndAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                status: new JobDetailStatus(command.payload.status),
                name: new JobDetailName(command.payload.name),
                returnCode: new JobDetailReturnCode(command.payload.returnCode),
                node: new JobDetailNode(command.payload.node),
                user: new JobDetailUser(command.payload.user),
                startAt: new JobDetailStartAt(command.payload.startAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                endAt: new JobDetailEndAt(command.payload.endAt, {}, {removeTimezone: command.cQMetadata.timezone}),
            }
        );
    }
}