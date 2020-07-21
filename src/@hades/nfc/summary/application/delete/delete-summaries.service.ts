import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ISummaryRepository } from './../../domain/summary.repository';
import { AddSummariesContextEvent } from './../events/add-summaries-context.event';

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

        // create AddSummariesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const summariesRegistered = this.publisher.mergeObjectContext(new AddSummariesContextEvent(summaries));

        summariesRegistered.deleted(); // apply event to model events
        summariesRegistered.commit(); // commit all events of modelx
    }
}