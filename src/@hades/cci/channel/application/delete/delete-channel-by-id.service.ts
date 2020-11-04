import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { ChannelId } from './../../domain/value-objects';
import { IChannelRepository } from './../../domain/channel.repository';

@Injectable()
export class DeleteChannelByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelRepository,
    ) {}

    public async main(id: ChannelId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const channel = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const channelRegister = this.publisher.mergeObjectContext(channel);

        channelRegister.deleted(channel); // apply event to model events
        channelRegister.commit(); // commit all events of model
    }
}