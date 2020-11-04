import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJobsDetailCommand } from './create-jobs-detail.command';
import { CreateJobsDetailService } from './create-jobs-detail.service';
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

@CommandHandler(CreateJobsDetailCommand)
export class CreateJobsDetailCommandHandler implements ICommandHandler<CreateJobsDetailCommand>
{
    constructor(
        private readonly createJobsDetailService: CreateJobsDetailService,
    ) {}

    async execute(command: CreateJobsDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createJobsDetailService.main(
            command.payload
                .map(jobDetail => {
                    return {
                        id: new JobDetailId(jobDetail.id),
                        tenantId: new JobDetailTenantId(jobDetail.tenantId),
                        tenantCode: new JobDetailTenantCode(jobDetail.tenantCode),
                        systemId: new JobDetailSystemId(jobDetail.systemId),
                        systemName: new JobDetailSystemName(jobDetail.systemName),
                        executionId: new JobDetailExecutionId(jobDetail.executionId),
                        executionType: new JobDetailExecutionType(jobDetail.executionType),
                        executionExecutedAt: new JobDetailExecutionExecutedAt(jobDetail.executionExecutedAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                        executionMonitoringStartAt: new JobDetailExecutionMonitoringStartAt(jobDetail.executionMonitoringStartAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                        executionMonitoringEndAt: new JobDetailExecutionMonitoringEndAt(jobDetail.executionMonitoringEndAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                        status: new JobDetailStatus(jobDetail.status),
                        name: new JobDetailName(jobDetail.name),
                        returnCode: new JobDetailReturnCode(jobDetail.returnCode),
                        node: new JobDetailNode(jobDetail.node),
                        user: new JobDetailUser(jobDetail.user),
                        startAt: new JobDetailStartAt(jobDetail.startAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                        endAt: new JobDetailEndAt(jobDetail.endAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                    }
                })
        );
    }
}