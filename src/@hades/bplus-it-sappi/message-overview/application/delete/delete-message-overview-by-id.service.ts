import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { MessageOverviewId } from './../../domain/value-objects';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';

@Injectable()
export class DeleteMessageOverviewByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IMessageOverviewRepository
    ) {}

    public async main(id: MessageOverviewId): Promise<void>
    {
        // get object to delete
        const messageOverview = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const messageOverviewRegister = this.publisher.mergeObjectContext(messageOverview);
        
        messageOverviewRegister.deleted(messageOverview); // apply event to model events
        messageOverviewRegister.commit(); // commit all events of model
    }
}