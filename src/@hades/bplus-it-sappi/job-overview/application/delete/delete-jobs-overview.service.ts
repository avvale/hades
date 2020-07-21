import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { AddJobsOverviewContextEvent } from './../events/add-jobs-overview-context.event';

@Injectable()
export class DeleteJobsOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobOverviewRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const jobsOverview = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddJobsOverviewContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const jobsOverviewRegistered = this.publisher.mergeObjectContext(new AddJobsOverviewContextEvent(jobsOverview));

        jobsOverviewRegistered.deleted(); // apply event to model events
        jobsOverviewRegistered.commit(); // commit all events of modelx
    }
}