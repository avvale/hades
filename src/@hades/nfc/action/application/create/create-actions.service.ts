import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    ActionId, 
    ActionTagId, 
    ActionType, 
    ActionSectionId, 
    ActionData, 
    ActionCreatedAt, 
    ActionUpdatedAt, 
    ActionDeletedAt
    
} from './../../domain/value-objects';
import { IActionRepository } from './../../domain/action.repository';
import { NfcAction } from './../../domain/action.aggregate';
import { AddActionsContextEvent } from './../events/add-actions-context.event';

@Injectable()
export class CreateActionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IActionRepository
    ) {}

    public async main(
        actions: {
            id: ActionId,
            tagId: ActionTagId,
            type: ActionType,
            sectionId: ActionSectionId,
            data: ActionData,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateActions = actions.map(action => NfcAction.register(
            action.id,
            action.tagId,
            action.type,
            action.sectionId,
            action.data,
            new ActionCreatedAt(Utils.nowTimestamp()),
            new ActionUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateActions);

        // create AddActionsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const actionsRegistered = this.publisher.mergeObjectContext(new AddActionsContextEvent(aggregateActions));
 
        actionsRegistered.created(); // apply event to model events
        actionsRegistered.commit(); // commit all events of model
    }
}