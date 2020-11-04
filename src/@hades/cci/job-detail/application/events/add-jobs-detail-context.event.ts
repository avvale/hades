import { AggregateRoot } from '@nestjs/cqrs';
import { CciJobDetail } from './../../domain/job-detail.aggregate';
import { CreatedJobDetailEvent } from './created-job-detail.event';
import { DeletedJobDetailEvent } from './deleted-job-detail.event';
import { CreatedJobsDetailEvent } from './created-jobs-detail.event';
import { DeletedJobsDetailEvent } from './deleted-jobs-detail.event';

export class AddJobsDetailContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: CciJobDetail[] = [],
    ) {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created()
    {
        this.apply(
            new CreatedJobsDetailEvent(
                this.aggregateRoots.map(jobDetail =>
                    new CreatedJobDetailEvent(
                        jobDetail.id.value,
                        jobDetail.tenantId.value,
                        jobDetail.tenantCode.value,
                        jobDetail.systemId.value,
                        jobDetail.systemName.value,
                        jobDetail.executionId.value,
                        jobDetail.executionType.value,
                        jobDetail.executionExecutedAt.value,
                        jobDetail.executionMonitoringStartAt.value,
                        jobDetail.executionMonitoringEndAt.value,
                        jobDetail.status.value,
                        jobDetail.name?.value,
                        jobDetail.returnCode?.value,
                        jobDetail.node?.value,
                        jobDetail.user?.value,
                        jobDetail.startAt.value,
                        jobDetail.endAt.value,
                        jobDetail.createdAt?.value,
                        jobDetail.updatedAt?.value,
                        jobDetail.deletedAt?.value,
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedJobsDetailEvent(
                this.aggregateRoots.map(jobDetail =>
                    new DeletedJobDetailEvent(
                        jobDetail.id.value,
                        jobDetail.tenantId.value,
                        jobDetail.tenantCode.value,
                        jobDetail.systemId.value,
                        jobDetail.systemName.value,
                        jobDetail.executionId.value,
                        jobDetail.executionType.value,
                        jobDetail.executionExecutedAt.value,
                        jobDetail.executionMonitoringStartAt.value,
                        jobDetail.executionMonitoringEndAt.value,
                        jobDetail.status.value,
                        jobDetail.name?.value,
                        jobDetail.returnCode?.value,
                        jobDetail.node?.value,
                        jobDetail.user?.value,
                        jobDetail.startAt.value,
                        jobDetail.endAt.value,
                        jobDetail.createdAt?.value,
                        jobDetail.updatedAt?.value,
                        jobDetail.deletedAt?.value,
                    )
                )
            )
        );
    }
}