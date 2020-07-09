import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ISummaryRepository } from './../../domain/summary.repository';

@Injectable()
export class DeleteSummariesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISummaryRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const summaries = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);        

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const summariesRegistered = this.publisher.mergeObjectContext(summaries);
        
        // summariesRegistered.deleted(summaries); // apply event to model events
        // summariesRegistered.commit(); // commit all events of model
    }
}