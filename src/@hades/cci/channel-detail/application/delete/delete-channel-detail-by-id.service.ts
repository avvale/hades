import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { ChannelDetailId } from './../../domain/value-objects';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';

@Injectable()
export class DeleteChannelDetailByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelDetailRepository,
    ) {}

    public async main(id: ChannelDetailId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const channelDetail = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const channelDetailRegister = this.publisher.mergeObjectContext(channelDetail);

        channelDetailRegister.deleted(channelDetail); // apply event to model events
        channelDetailRegister.commit(); // commit all events of model
    }
}