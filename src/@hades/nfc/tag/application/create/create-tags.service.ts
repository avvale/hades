import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    TagId, 
    TagCode, 
    TagTenantId, 
    TagTenantCode, 
    TagUrlBase, 
    TagParams, 
    TagOffset, 
    TagIsSessionRequired, 
    TagCreatedAt, 
    TagUpdatedAt, 
    TagDeletedAt
    
} from './../../domain/value-objects';
import { ITagRepository } from './../../domain/tag.repository';
import { NfcTag } from './../../domain/tag.aggregate';
import { AddTagsContextEvent } from './../events/add-tags-context.event';

@Injectable()
export class CreateTagsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ITagRepository
    ) {}

    public async main(
        tags: {
            id: TagId,
            code: TagCode,
            tenantId: TagTenantId,
            tenantCode: TagTenantCode,
            urlBase: TagUrlBase,
            params: TagParams,
            offset: TagOffset,
            isSessionRequired: TagIsSessionRequired,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateTags = tags.map(tag => NfcTag.register(
            tag.id,
            tag.code,
            tag.tenantId,
            tag.tenantCode,
            tag.urlBase,
            tag.params,
            tag.offset,
            tag.isSessionRequired,
            new TagCreatedAt(Utils.nowTimestamp()),
            new TagUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateTags);

        // create AddTagsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const tagsRegistered = this.publisher.mergeObjectContext(new AddTagsContextEvent(aggregateTags));
 
        tagsRegistered.created(); // apply event to model events
        tagsRegistered.commit(); // commit all events of model
    }
}