import { AggregateRoot } from '@nestjs/cqrs';
import { NfcTag } from './../../domain/tag.aggregate';
import { CreatedTagEvent } from './created-tag.event';
import { DeletedTagEvent } from './deleted-tag.event';
import { CreatedTagsEvent } from './created-tags.event';
import { DeletedTagsEvent } from './deleted-tags.event';

export class AddTagsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: NfcTag[] = []
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
            new CreatedTagsEvent(
                this.aggregateRoots.map(tag => 
                    new CreatedTagEvent(
                        tag.id.value,
                        tag.code.value,
                        tag.tenantId.value,
                        tag.tenantCode.value,
                        tag.urlBase.value,
                        tag.params?.value,
                        tag.offset?.value,
                        tag.isSessionRequired?.value,
                        tag.createdAt?.value,
                        tag.updatedAt?.value,
                        tag.deletedAt?.value,
                        
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedTagsEvent(
                this.aggregateRoots.map(tag => 
                    new DeletedTagEvent(
                        tag.id.value,
                        tag.code.value,
                        tag.tenantId.value,
                        tag.tenantCode.value,
                        tag.urlBase.value,
                        tag.params?.value,
                        tag.offset?.value,
                        tag.isSessionRequired?.value,
                        tag.createdAt?.value,
                        tag.updatedAt?.value,
                        tag.deletedAt?.value,
                           
                    )
                )
            )
        );
    }   
}