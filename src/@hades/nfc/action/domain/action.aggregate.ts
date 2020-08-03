import { AggregateRoot } from '@nestjs/cqrs';
import { 
    ActionId, 
    ActionTagId, 
    ActionType, 
    ActionSectionId, 
    ActionData, 
    ActionCreatedAt, 
    ActionUpdatedAt, 
    ActionDeletedAt
    
} from './value-objects';
import { CreatedActionEvent } from './../application/events/created-action.event';
import { UpdatedActionEvent } from './../application/events/updated-action.event';
import { DeletedActionEvent } from './../application/events/deleted-action.event';
import { NfcTag } from '@hades/nfc/tag/domain/tag.aggregate';

export class NfcAction extends AggregateRoot
{
    id: ActionId;
    tagId: ActionTagId;
    type: ActionType;
    sectionId: ActionSectionId;
    data: ActionData;
    createdAt: ActionCreatedAt;
    updatedAt: ActionUpdatedAt;
    deletedAt: ActionDeletedAt;
    
    constructor(id?: ActionId, tagId?: ActionTagId, type?: ActionType, sectionId?: ActionSectionId, data?: ActionData, createdAt?: ActionCreatedAt, updatedAt?: ActionUpdatedAt, deletedAt?: ActionDeletedAt, )
    {
        super();
        
        this.id = id;
        this.tagId = tagId;
        this.type = type;
        this.sectionId = sectionId;
        this.data = data;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: ActionId, tagId: ActionTagId, type: ActionType, sectionId: ActionSectionId, data: ActionData, createdAt: ActionCreatedAt, updatedAt: ActionUpdatedAt, deletedAt: ActionDeletedAt, ): NfcAction
    {
        return new NfcAction(id, tagId, type, sectionId, data, createdAt, updatedAt, deletedAt, );
    }

    created(action: NfcAction): void
    {
        this.apply(
            new CreatedActionEvent(
                action.id.value,
                action.tagId.value,
                action.type.value,
                action.sectionId?.value,
                action.data?.value,
                action.createdAt?.value,
                action.updatedAt?.value,
                action.deletedAt?.value,
                
            )
        );
    }

    updated(action: NfcAction): void
    {
        this.apply(
            new UpdatedActionEvent(
                action.id.value,
                action.tagId?.value,
                action.type?.value,
                action.sectionId?.value,
                action.data?.value,
                action.createdAt?.value,
                action.updatedAt?.value,
                action.deletedAt?.value,
                
            )
        );
    }

    deleted(action: NfcAction): void
    {
        this.apply(
            new DeletedActionEvent(
                action.id.value,
                action.tagId.value,
                action.type.value,
                action.sectionId?.value,
                action.data?.value,
                action.createdAt?.value,
                action.updatedAt?.value,
                action.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            tagId: this.tagId.value,
            type: this.type.value,
            sectionId: this.sectionId?.value,
            data: this.data?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
