import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IClientRepository } from './../../domain/client.repository';
import { AddClientsContextEvent } from './../events/add-clients-context.event';

@Injectable()
export class DeleteClientsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IClientRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const clients = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddClientsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const clientsRegistered = this.publisher.mergeObjectContext(new AddClientsContextEvent(clients));

        clientsRegistered.deleted(); // apply event to model events
        clientsRegistered.commit(); // commit all events of model
    }
}