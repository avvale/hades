import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ResourceId } from './../../domain/value-objects';
import { IResourceRepository } from './../../domain/resource.repository';

@Injectable()
export class DeleteResourceByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IResourceRepository
    ) {}

    public async main(id: ResourceId): Promise<void>
    {
        // get object to delete
        const resource = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const resourceRegister = this.publisher.mergeObjectContext(resource);
        
        resourceRegister.deleted(resource); // apply event to model events
        resourceRegister.commit(); // commit all events of model
    }
}