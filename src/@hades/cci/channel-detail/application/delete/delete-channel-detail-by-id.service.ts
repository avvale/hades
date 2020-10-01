import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ChannelDetailId } from './../../domain/value-objects';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';

@Injectable()
export class DeleteChannelDetailByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelDetailRepository
    ) {}

    public async main(id: ChannelDetailId): Promise<void>
    {
        // get object to delete
        const channelDetail = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const channelDetailRegister = this.publisher.mergeObjectContext(channelDetail);
        
        channelDetailRegister.deleted(channelDetail); // apply event to model events
        channelDetailRegister.commit(); // commit all events of model
    }
}