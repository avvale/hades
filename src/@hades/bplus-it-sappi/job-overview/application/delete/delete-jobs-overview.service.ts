import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';

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

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const jobsOverviewRegistered = this.publisher.mergeObjectContext(jobsOverview);
        
        // jobsOverviewRegistered.deleted(jobsOverview); // apply event to model events
        // jobsOverviewRegistered.commit(); // commit all events of model
    }
}