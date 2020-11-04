import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { MessageOverviewId } from './../../domain/value-objects';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';

@Injectable()
export class DeleteMessageOverviewByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IMessageOverviewRepository,
    ) {}

    public async main(id: MessageOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const messageOverview = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const messageOverviewRegister = this.publisher.mergeObjectContext(messageOverview);

        messageOverviewRegister.deleted(messageOverview); // apply event to model events
        messageOverviewRegister.commit(); // commit all events of model
    }
}