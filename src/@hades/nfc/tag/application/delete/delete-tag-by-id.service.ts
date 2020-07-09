import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { TagId } from './../../domain/value-objects';
import { ITagRepository } from './../../domain/tag.repository';

@Injectable()
export class DeleteTagByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ITagRepository
    ) {}

    public async main(id: TagId): Promise<void>
    {
        // get object to delete
        const tag = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const tagRegister = this.publisher.mergeObjectContext(tag);
        
        tagRegister.deleted(tag); // apply event to model events
        tagRegister.commit(); // commit all events of model
    }
}