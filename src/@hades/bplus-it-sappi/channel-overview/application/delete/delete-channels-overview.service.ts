import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';

@Injectable()
export class DeleteChannelsOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelOverviewRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const channelsOverview = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);        

        // TODO a falta de definir eventos
        // insert EventBus in object, to be able to apply and commit events
        // const channelsOverviewRegistered = this.publisher.mergeObjectContext(channelsOverview);
        
        // channelsOverviewRegistered.deleted(channelsOverview); // apply event to model events
        // channelsOverviewRegistered.commit(); // commit all events of model
    }
}