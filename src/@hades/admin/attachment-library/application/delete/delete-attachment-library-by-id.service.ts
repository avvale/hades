import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { AttachmentLibraryId } from './../../domain/value-objects';
import { IAttachmentLibraryRepository } from './../../domain/attachment-library.repository';

@Injectable()
export class DeleteAttachmentLibraryByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAttachmentLibraryRepository,
    ) {}

    public async main(id: AttachmentLibraryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const attachmentLibrary = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const attachmentLibraryRegister = this.publisher.mergeObjectContext(attachmentLibrary);

        attachmentLibraryRegister.deleted(attachmentLibrary); // apply event to model events
        attachmentLibraryRegister.commit(); // commit all events of model
    }
}