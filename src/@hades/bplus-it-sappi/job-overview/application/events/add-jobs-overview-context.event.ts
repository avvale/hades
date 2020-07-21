import { AggregateRoot } from '@nestjs/cqrs';
import { BplusItSappiJobOverview } from './../../domain/job-overview.aggregate';
import { CreatedJobOverviewEvent } from './created-job-overview.event';
import { DeletedJobOverviewEvent } from './deleted-job-overview.event';
import { CreatedJobsOverviewEvent } from './created-jobs-overview.event';
import { DeletedJobsOverviewEvent } from './deleted-jobs-overview.event';

export class AddJobsOverviewContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: BplusItSappiJobOverview[] = []
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
            new CreatedJobsOverviewEvent(
                this.aggregateRoots.map(jobOverview => 
                    new CreatedJobOverviewEvent(
                        jobOverview.id.value,
                        jobOverview.tenantId.value,
                        jobOverview.systemId.value,
                        jobOverview.systemName.value,
                        jobOverview.executionId.value,
                        jobOverview.executionType.value,
                        jobOverview.executionExecutedAt.value,
                        jobOverview.executionMonitoringStartAt.value,
                        jobOverview.executionMonitoringEndAt.value,
                        jobOverview.cancelled?.value,
                        jobOverview.completed?.value,
                        jobOverview.error?.value,
                        jobOverview.createdAt?.value,
                        jobOverview.updatedAt?.value,
                        jobOverview.deletedAt?.value,
                        
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedJobsOverviewEvent(
                this.aggregateRoots.map(jobOverview => 
                    new DeletedJobOverviewEvent(
                        jobOverview.id.value,
                        jobOverview.tenantId.value,
                        jobOverview.systemId.value,
                        jobOverview.systemName.value,
                        jobOverview.executionId.value,
                        jobOverview.executionType.value,
                        jobOverview.executionExecutedAt.value,
                        jobOverview.executionMonitoringStartAt.value,
                        jobOverview.executionMonitoringEndAt.value,
                        jobOverview.cancelled?.value,
                        jobOverview.completed?.value,
                        jobOverview.error?.value,
                        jobOverview.createdAt?.value,
                        jobOverview.updatedAt?.value,
                        jobOverview.deletedAt?.value,
                           
                    )
                )
            )
        );
    }   
}