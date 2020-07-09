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

@Injectable()
export class InsertActionsService
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

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const actionsRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id) // there may be cases where the database object is direct to the command, for example in the update, only one field can be updated
        // );
        // 
        // actionsRegistered.created(actions); // apply event to model events
        // actionsRegistered.commit(); // commit all events of model
    }
}