import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IBoundedContextRepository } from './../../domain/bounded-context.repository';
import { AddBoundedContextsContextEvent } from './../events/add-bounded-contexts-context.event';

@Injectable()
export class DeleteBoundedContextsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IBoundedContextRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const boundedContexts = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddBoundedContextsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const boundedContextsRegistered = this.publisher.mergeObjectContext(new AddBoundedContextsContextEvent(boundedContexts));

        boundedContextsRegistered.deleted(); // apply event to model events
        boundedContextsRegistered.commit(); // commit all events of model
    }
}