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
export class CreateTagService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ITagRepository
    ) {}

    public async main(
        id: TagId,
        code: TagCode,
        tenantId: TagTenantId,
        tenantCode: TagTenantCode,
        urlBase: TagUrlBase,
        params: TagParams,
        offset: TagOffset,
        isSessionRequired: TagIsSessionRequired,
        
    ): Promise<void>
    {
        // create object with factory pattern
        const tag = NfcTag.register(
            id,
            code,
            tenantId,
            tenantCode,
            urlBase,
            params,
            offset,
            isSessionRequired,
            new TagCreatedAt(Utils.nowTimestamp()),
            new TagUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(tag);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const tagRegister = this.publisher.mergeObjectContext(
            tag
        );
        
        tagRegister.created(tag); // apply event to model events
        tagRegister.commit(); // commit all events of model
    }
}