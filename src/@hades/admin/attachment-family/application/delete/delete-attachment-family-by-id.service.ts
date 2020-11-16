import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { AttachmentFamilyId } from './../../domain/value-objects';
import { IAttachmentFamilyRepository } from './../../domain/attachment-family.repository';

@Injectable()
export class DeleteAttachmentFamilyByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAttachmentFamilyRepository,
    ) {}

    public async main(id: AttachmentFamilyId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const attachmentFamily = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const attachmentFamilyRegister = this.publisher.mergeObjectContext(attachmentFamily);

        attachmentFamilyRegister.deleted(attachmentFamily); // apply event to model events
        attachmentFamilyRegister.commit(); // commit all events of model
    }
}