import { AggregateRoot } from '@nestjs/cqrs';
import { NfcAction } from './../../domain/action.aggregate';
import { CreatedActionEvent } from './created-action.event';
import { DeletedActionEvent } from './deleted-action.event';
import { CreatedActionsEvent } from './created-actions.event';
import { DeletedActionsEvent } from './deleted-actions.event';

export class AddActionsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: NfcAction[] = []
    ) {
        super();
    }

    *[Symbol.iterator]()
    { 
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot; 
    }

    created()
    {
        this.apply(
            new CreatedActionsEvent(
                this.aggregateRoots.map(action => 
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
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedActionsEvent(
                this.aggregateRoots.map(action => 
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
                )
            )
        );
    }   
}