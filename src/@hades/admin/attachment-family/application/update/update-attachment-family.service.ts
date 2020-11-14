import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import {
    AttachmentFamilyId,
    AttachmentFamilyName,
    AttachmentFamilyResourceIds,
    AttachmentFamilyWidth,
    AttachmentFamilyHeight,
    AttachmentFamilyFit,
    AttachmentFamilySizes,
    AttachmentFamilyQuality,
    AttachmentFamilyFormat,
    AttachmentFamilyCreatedAt,
    AttachmentFamilyUpdatedAt,
    AttachmentFamilyDeletedAt,
} from './../../domain/value-objects';
import { IAttachmentFamilyRepository } from './../../domain/attachment-family.repository';
import { AdminAttachmentFamily } from './../../domain/attachment-family.aggregate';

@Injectable()
export class UpdateAttachmentFamilyService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAttachmentFamilyRepository,
    ) {}

    public async main(
        payload: {
            id: AttachmentFamilyId,
            name?: AttachmentFamilyName,
            resourceIds?: AttachmentFamilyResourceIds,
            width?: AttachmentFamilyWidth,
            height?: AttachmentFamilyHeight,
            fit?: AttachmentFamilyFit,
            sizes?: AttachmentFamilySizes,
            quality?: AttachmentFamilyQuality,
            format?: AttachmentFamilyFormat,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const attachmentFamily = AdminAttachmentFamily.register(
            payload.id,
            payload.name,
            payload.resourceIds,
            payload.width,
            payload.height,
            payload.fit,
            payload.sizes,
            payload.quality,
            payload.format,
            null,
            new AttachmentFamilyUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(attachmentFamily, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const attachmentFamilyRegister = this.publisher.mergeObjectContext(
            attachmentFamily
        );

        attachmentFamilyRegister.updated(attachmentFamily); // apply event to model events
        attachmentFamilyRegister.commit(); // commit all events of model
    }
}