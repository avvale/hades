import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { BoundedContextId } from './../../domain/value-objects';
import { IBoundedContextRepository } from './../../domain/bounded-context.repository';

@Injectable()
export class DeleteBoundedContextByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IBoundedContextRepository
    ) {}

    public async main(id: BoundedContextId): Promise<void>
    {
        // get object to delete
        const boundedContext = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const boundedContextRegister = this.publisher.mergeObjectContext(boundedContext);
        
        boundedContextRegister.deleted(boundedContext); // apply event to model events
        boundedContextRegister.commit(); // commit all events of model
    }
}