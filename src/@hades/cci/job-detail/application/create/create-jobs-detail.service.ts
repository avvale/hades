import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { CciJobDetail } from './../../domain/job-detail.aggregate';
import { AddJobsDetailContextEvent } from './../events/add-jobs-detail-context.event';

@Injectable()
export class CreateJobsDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobDetailRepository,
    ) {}

    public async main(
        jobsDetail: {
            id: JobDetailId,
            tenantId: JobDetailTenantId,
            tenantCode: JobDetailTenantCode,
            systemId: JobDetailSystemId,
            systemName: JobDetailSystemName,
            executionId: JobDetailExecutionId,
            executionType: JobDetailExecutionType,
            executionExecutedAt: JobDetailExecutionExecutedAt,
            executionMonitoringStartAt: JobDetailExecutionMonitoringStartAt,
            executionMonitoringEndAt: JobDetailExecutionMonitoringEndAt,
            status: JobDetailStatus,
            name: JobDetailName,
            returnCode: JobDetailReturnCode,
            node: JobDetailNode,
            user: JobDetailUser,
            startAt: JobDetailStartAt,
            endAt: JobDetailEndAt,
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateJobsDetail = jobsDetail.map(jobDetail => CciJobDetail.register(
            jobDetail.id,
            jobDetail.tenantId,
            jobDetail.tenantCode,
            jobDetail.systemId,
            jobDetail.systemName,
            jobDetail.executionId,
            jobDetail.executionType,
            jobDetail.executionExecutedAt,
            jobDetail.executionMonitoringStartAt,
            jobDetail.executionMonitoringEndAt,
            jobDetail.status,
            jobDetail.name,
            jobDetail.returnCode,
            jobDetail.node,
            jobDetail.user,
            jobDetail.startAt,
            jobDetail.endAt,
            new JobDetailCreatedAt({currentTimestamp: true}),
            new JobDetailUpdatedAt({currentTimestamp: true}),
            null
        ));

        // insert
        await this.repository.insert(aggregateJobsDetail);

        // create AddJobsDetailContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const jobsDetailRegistered = this.publisher.mergeObjectContext(new AddJobsDetailContextEvent(aggregateJobsDetail));

        jobsDetailRegistered.created(); // apply event to model events
        jobsDetailRegistered.commit(); // commit all events of model
    }
}