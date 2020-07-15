import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';

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

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const channelsDetailRegistered = this.publisher.mergeObjectContext(channelsDetail);
        
        // channelsDetailRegistered.deleted(channelsDetail); // apply event to model events
        // channelsDetailRegistered.commit(); // commit all events of model
    }
}