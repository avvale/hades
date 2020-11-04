import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
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

@Injectable()
export class UpdateJobDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobDetailRepository,
    ) {}

    public async main(
        payload: {
            id: JobDetailId,
            tenantId?: JobDetailTenantId,
            tenantCode?: JobDetailTenantCode,
            systemId?: JobDetailSystemId,
            systemName?: JobDetailSystemName,
            executionId?: JobDetailExecutionId,
            executionType?: JobDetailExecutionType,
            executionExecutedAt?: JobDetailExecutionExecutedAt,
            executionMonitoringStartAt?: JobDetailExecutionMonitoringStartAt,
            executionMonitoringEndAt?: JobDetailExecutionMonitoringEndAt,
            status?: JobDetailStatus,
            name?: JobDetailName,
            returnCode?: JobDetailReturnCode,
            node?: JobDetailNode,
            user?: JobDetailUser,
            startAt?: JobDetailStartAt,
            endAt?: JobDetailEndAt,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const jobDetail = CciJobDetail.register(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.status,
            payload.name,
            payload.returnCode,
            payload.node,
            payload.user,
            payload.startAt,
            payload.endAt,
            null,
            new JobDetailUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(jobDetail, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const jobDetailRegister = this.publisher.mergeObjectContext(
            jobDetail
        );

        jobDetailRegister.updated(jobDetail); // apply event to model events
        jobDetailRegister.commit(); // commit all events of model
    }
}