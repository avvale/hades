import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAttachmentFamilyRepository } from './../../domain/attachment-family.repository';
import { AddAttachmentFamiliesContextEvent } from './../events/add-attachment-families-context.event';

@Injectable()
export class DeleteAttachmentFamiliesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAttachmentFamilyRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const attachmentFamilies = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddAttachmentFamiliesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const attachmentFamiliesRegistered = this.publisher.mergeObjectContext(new AddAttachmentFamiliesContextEvent(attachmentFamilies));

        attachmentFamiliesRegistered.deleted(); // apply event to model events
        attachmentFamiliesRegistered.commit(); // commit all events of model
    }
}