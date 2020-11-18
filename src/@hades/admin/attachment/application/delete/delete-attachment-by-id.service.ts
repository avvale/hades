import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { AttachmentId } from './../../domain/value-objects';
import { IAttachmentRepository } from './../../domain/attachment.repository';

@Injectable()
export class DeleteAttachmentByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAttachmentRepository,
    ) {}

    public async main(id: AttachmentId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const attachment = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const attachmentRegister = this.publisher.mergeObjectContext(attachment);

        attachmentRegister.deleted(attachment); // apply event to model events
        attachmentRegister.commit(); // commit all events of model
    }
}