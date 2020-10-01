import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ContactId } from './../../domain/value-objects';
import { IContactRepository } from './../../domain/contact.repository';

@Injectable()
export class DeleteContactByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IContactRepository
    ) {}

    public async main(id: ContactId): Promise<void>
    {
        // get object to delete
        const contact = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const contactRegister = this.publisher.mergeObjectContext(contact);
        
        contactRegister.deleted(contact); // apply event to model events
        contactRegister.commit(); // commit all events of model
    }
}