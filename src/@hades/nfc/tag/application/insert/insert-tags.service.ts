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

@Injectable()
export class InsertTagsService
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

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const tagsRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id) // there may be cases where the database object is direct to the command, for example in the update, only one field can be updated
        // );
        // 
        // tagsRegistered.created(tags); // apply event to model events
        // tagsRegistered.commit(); // commit all events of model
    }
}