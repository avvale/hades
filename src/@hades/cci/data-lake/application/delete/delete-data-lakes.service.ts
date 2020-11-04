import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { AddDataLakesContextEvent } from './../events/add-data-lakes-context.event';

@Injectable()
export class DeleteDataLakesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IDataLakeRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const dataLakes = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddDataLakesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const dataLakesRegistered = this.publisher.mergeObjectContext(new AddDataLakesContextEvent(dataLakes));

        dataLakesRegistered.deleted(); // apply event to model events
        dataLakesRegistered.commit(); // commit all events of model
    }
}