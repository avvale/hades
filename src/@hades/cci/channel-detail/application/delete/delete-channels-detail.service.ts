import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { AddChannelsDetailContextEvent } from './../events/add-channels-detail-context.event';

@Injectable()
export class DeleteChannelsDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelDetailRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const channelsDetail = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddChannelsDetailContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const channelsDetailRegistered = this.publisher.mergeObjectContext(new AddChannelsDetailContextEvent(channelsDetail));

        channelsDetailRegistered.deleted(); // apply event to model events
        channelsDetailRegistered.commit(); // commit all events of model
    }
}