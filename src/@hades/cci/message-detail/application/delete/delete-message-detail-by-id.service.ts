import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { MessageDetailId } from './../../domain/value-objects';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';

@Injectable()
export class DeleteMessageDetailByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IMessageDetailRepository
    ) {}

    public async main(id: MessageDetailId): Promise<void>
    {
        // get object to delete
        const messageDetail = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const messageDetailRegister = this.publisher.mergeObjectContext(messageDetail);
        
        messageDetailRegister.deleted(messageDetail); // apply event to model events
        messageDetailRegister.commit(); // commit all events of model
    }
}