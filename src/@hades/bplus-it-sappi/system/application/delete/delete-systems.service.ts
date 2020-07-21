import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ISystemRepository } from './../../domain/system.repository';
import { AddSystemsContextEvent } from './../events/add-systems-context.event';

@Injectable()
export class DeleteSystemsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISystemRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const systems = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddSystemsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const systemsRegistered = this.publisher.mergeObjectContext(new AddSystemsContextEvent(systems));

        systemsRegistered.deleted(); // apply event to model events
        systemsRegistered.commit(); // commit all events of modelx
    }
}