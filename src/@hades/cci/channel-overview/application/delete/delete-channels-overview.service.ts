import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { AddChannelsOverviewContextEvent } from './../events/add-channels-overview-context.event';

@Injectable()
export class DeleteChannelsOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelOverviewRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<void>
    {   
        // get object to delete
        const channelsOverview = await this.repository.get(queryStatement);

        await this.repository.delete(queryStatement);

        // create AddChannelsOverviewContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const channelsOverviewRegistered = this.publisher.mergeObjectContext(new AddChannelsOverviewContextEvent(channelsOverview));

        channelsOverviewRegistered.deleted(); // apply event to model events
        channelsOverviewRegistered.commit(); // commit all events of model
    }
}