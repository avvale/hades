import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { AddChannelsDetailContextEvent } from './../events/add-channels-detail-context.event';

@Injectable()
export class DeleteChannelsDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelDetailRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const channelsDetail = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddChannelsDetailContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const channelsDetailRegistered = this.publisher.mergeObjectContext(new AddChannelsDetailContextEvent(channelsDetail));

        channelsDetailRegistered.deleted(); // apply event to model events
        channelsDetailRegistered.commit(); // commit all events of modelx
    }
}