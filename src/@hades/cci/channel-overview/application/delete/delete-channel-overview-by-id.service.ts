import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ChannelOverviewId } from './../../domain/value-objects';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';

@Injectable()
export class DeleteChannelOverviewByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelOverviewRepository
    ) {}

    public async main(id: ChannelOverviewId): Promise<void>
    {
        // get object to delete
        const channelOverview = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const channelOverviewRegister = this.publisher.mergeObjectContext(channelOverview);
        
        channelOverviewRegister.deleted(channelOverview); // apply event to model events
        channelOverviewRegister.commit(); // commit all events of model
    }
}