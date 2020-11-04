import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { ChannelOverviewId } from './../../domain/value-objects';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';

@Injectable()
export class DeleteChannelOverviewByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelOverviewRepository,
    ) {}

    public async main(id: ChannelOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const channelOverview = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const channelOverviewRegister = this.publisher.mergeObjectContext(channelOverview);

        channelOverviewRegister.deleted(channelOverview); // apply event to model events
        channelOverviewRegister.commit(); // commit all events of model
    }
}