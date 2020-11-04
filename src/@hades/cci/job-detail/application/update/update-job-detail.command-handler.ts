import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateJobDetailCommand } from './update-job-detail.command';
import { UpdateJobDetailService } from './update-job-detail.service';
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

@CommandHandler(UpdateJobDetailCommand)
export class UpdateJobDetailCommandHandler implements ICommandHandler<UpdateJobDetailCommand>
{
    constructor(
        private readonly updateJobDetailService: UpdateJobDetailService,
    ) {}

    async execute(command: UpdateJobDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateJobDetailService.main(
            {
                id: new JobDetailId(command.payload.id),
                tenantId: new JobDetailTenantId(command.payload.tenantId, { undefinable: true }),
                tenantCode: new JobDetailTenantCode(command.payload.tenantCode, { undefinable: true }),
                systemId: new JobDetailSystemId(command.payload.systemId, { undefinable: true }),
                systemName: new JobDetailSystemName(command.payload.systemName, { undefinable: true }),
                executionId: new JobDetailExecutionId(command.payload.executionId, { undefinable: true }),
                executionType: new JobDetailExecutionType(command.payload.executionType, { undefinable: true }),
                executionExecutedAt: new JobDetailExecutionExecutedAt(command.payload.executionExecutedAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringStartAt: new JobDetailExecutionMonitoringStartAt(command.payload.executionMonitoringStartAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringEndAt: new JobDetailExecutionMonitoringEndAt(command.payload.executionMonitoringEndAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                status: new JobDetailStatus(command.payload.status, { undefinable: true }),
                name: new JobDetailName(command.payload.name),
                returnCode: new JobDetailReturnCode(command.payload.returnCode),
                node: new JobDetailNode(command.payload.node),
                user: new JobDetailUser(command.payload.user),
                startAt: new JobDetailStartAt(command.payload.startAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                endAt: new JobDetailEndAt(command.payload.endAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}