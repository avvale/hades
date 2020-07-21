import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IChannelRepository } from './../../domain/channel.repository';
import { AddChannelsContextEvent } from './../events/add-channels-context.event';

@Injectable()
export class DeleteChannelsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const channels = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddChannelsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const channelsRegistered = this.publisher.mergeObjectContext(new AddChannelsContextEvent(channels));

        channelsRegistered.deleted(); // apply event to model events
        channelsRegistered.commit(); // commit all events of modelx
    }
}