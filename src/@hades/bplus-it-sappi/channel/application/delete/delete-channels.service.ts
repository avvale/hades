import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IChannelRepository } from './../../domain/channel.repository';

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

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const channelsRegistered = this.publisher.mergeObjectContext(channels);
        
        // channelsRegistered.deleted(channels); // apply event to model events
        // channelsRegistered.commit(); // commit all events of model
    }
}