import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { AddDataLakesContextEvent } from './../events/add-data-lakes-context.event';

@Injectable()
export class DeleteDataLakesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IDataLakeRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const dataLakes = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddDataLakesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const dataLakesRegistered = this.publisher.mergeObjectContext(new AddDataLakesContextEvent(dataLakes));

        dataLakesRegistered.deleted(); // apply event to model events
        dataLakesRegistered.commit(); // commit all events of modelx
    }
}