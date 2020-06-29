import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IJobRepository } from './../../domain/job.repository';

@Injectable()
export class DeleteJobsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const jobs = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);        

        // TODO a falta de definir eventos
        // insert EventBus in object, to be able to apply and commit events
        // const jobsRegistered = this.publisher.mergeObjectContext(jobs);
        
        // jobsRegistered.deleted(jobs); // apply event to model events
        // jobsRegistered.commit(); // commit all events of model
    }
}