import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IJobDetailRepository } from './../../domain/job-detail.repository';

@Injectable()
export class DeleteJobsDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobDetailRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const jobsDetail = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);        

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const jobsDetailRegistered = this.publisher.mergeObjectContext(jobsDetail);
        
        // jobsDetailRegistered.deleted(jobsDetail); // apply event to model events
        // jobsDetailRegistered.commit(); // commit all events of model
    }
}