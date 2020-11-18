import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAttachmentRepository } from './../../domain/attachment.repository';
import { AddAttachmentsContextEvent } from './../events/add-attachments-context.event';

@Injectable()
export class DeleteAttachmentsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAttachmentRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const attachments = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddAttachmentsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const attachmentsRegistered = this.publisher.mergeObjectContext(new AddAttachmentsContextEvent(attachments));

        attachmentsRegistered.deleted(); // apply event to model events
        attachmentsRegistered.commit(); // commit all events of model
    }
}