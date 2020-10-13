import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { ChannelId } from './../../domain/value-objects';
import { IChannelRepository } from './../../domain/channel.repository';

@Injectable()
export class DeleteChannelByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelRepository
    ) {}

    public async main(id: ChannelId, constraint?: QueryStatement): Promise<void>
    {
        // get object to delete
        const channel = await this.repository.findById(id, constraint);

        await this.repository.deleteById(id, constraint);

        // insert EventBus in object, to be able to apply and commit events
        const channelRegister = this.publisher.mergeObjectContext(channel);
        
        channelRegister.deleted(channel); // apply event to model events
        channelRegister.commit(); // commit all events of model
    }
}