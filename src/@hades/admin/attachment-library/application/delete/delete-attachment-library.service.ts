import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAttachmentLibraryRepository } from './../../domain/attachment-library.repository';
import { AddAttachmentLibraryContextEvent } from './../events/add-attachment-library-context.event';

@Injectable()
export class DeleteAttachmentLibraryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAttachmentLibraryRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const attachmentLibrary = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddAttachmentLibraryContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const attachmentLibraryRegistered = this.publisher.mergeObjectContext(new AddAttachmentLibraryContextEvent(attachmentLibrary));

        attachmentLibraryRegistered.deleted(); // apply event to model events
        attachmentLibraryRegistered.commit(); // commit all events of model
    }
}