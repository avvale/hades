import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IActionRepository } from './../../domain/action.repository';
import { AddActionsContextEvent } from './../events/add-actions-context.event';

@Injectable()
export class DeleteActionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IActionRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const actions = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddActionsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const actionsRegistered = this.publisher.mergeObjectContext(new AddActionsContextEvent(actions));

        actionsRegistered.deleted(); // apply event to model events
        actionsRegistered.commit(); // commit all events of modelx
    }
}