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
export class UpdateActionService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IActionRepository
    ) {}

    public async main(
        id: ActionId,
        tagId?: ActionTagId,
        type?: ActionType,
        sectionId?: ActionSectionId,
        data?: ActionData,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const action = NfcAction.register(
            id,
            tagId,
            type,
            sectionId,
            data,
            null,
            new ActionUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(action);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const actionRegister = this.publisher.mergeObjectContext(
            action
        );
        
        actionRegister.updated(action); // apply event to model events
        actionRegister.commit(); // commit all events of model
    }
}