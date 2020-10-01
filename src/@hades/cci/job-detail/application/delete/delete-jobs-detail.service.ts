import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { AddJobsDetailContextEvent } from './../events/add-jobs-detail-context.event';

@Injectable()
export class DeleteJobsDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobDetailRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<void>
    {   
        // get object to delete
        const jobsDetail = await this.repository.get(queryStatement);

        await this.repository.delete(queryStatement);

        // create AddJobsDetailContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const jobsDetailRegistered = this.publisher.mergeObjectContext(new AddJobsDetailContextEvent(jobsDetail));

        jobsDetailRegistered.deleted(); // apply event to model events
        jobsDetailRegistered.commit(); // commit all events of model
    }
}