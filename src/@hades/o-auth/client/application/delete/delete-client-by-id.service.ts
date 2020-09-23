import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ClientId } from './../../domain/value-objects';
import { IClientRepository } from './../../domain/client.repository';

@Injectable()
export class DeleteClientByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IClientRepository
    ) {}

    public async main(id: ClientId): Promise<void>
    {
        // get object to delete
        const client = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const clientRegister = this.publisher.mergeObjectContext(client);
        
        clientRegister.deleted(client); // apply event to model events
        clientRegister.commit(); // commit all events of model
    }
}