import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { AdminAttachment } from './attachment.aggregate';
import { AttachmentResponse } from './attachment.response';
import {
    AttachmentId,
    AttachmentCommonId,
    AttachmentLangId,
    AttachmentAttachableModel,
    AttachmentAttachableId,
    AttachmentFamilyId,
    AttachmentSort,
    AttachmentAlt,
    AttachmentTitle,
    AttachmentDescription,
    AttachmentExcerpt,
    AttachmentName,
    AttachmentPathname,
    AttachmentFilename,
    AttachmentUrl,
    AttachmentMime,
    AttachmentExtension,
    AttachmentSize,
    AttachmentWidth,
    AttachmentHeight,
    AttachmentLibraryId,
    AttachmentLibraryFilename,
    AttachmentData,
    AttachmentCreatedAt,
    AttachmentUpdatedAt,
    AttachmentDeletedAt,
} from './value-objects';
import { AttachmentFamilyMapper } from '@hades/admin/attachment-family/domain/attachment-family.mapper';
import { AttachmentLibraryMapper } from '@hades/admin/attachment-library/domain/attachment-library.mapper';

export class AttachmentMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param attachment
     */
    mapModelToAggregate(attachment: ObjectLiteral, cQMetadata?: CQMetadata): AdminAttachment
    {
        if (!attachment) return;

        return this.makeAggregate(attachment, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param attachments
     */
    mapModelsToAggregates(attachments: ObjectLiteral[], cQMetadata?: CQMetadata): AdminAttachment[]
    {
        if (!Array.isArray(attachments)) return;

        return attachments.map(attachment  => this.makeAggregate(attachment, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param attachment
     */
    mapAggregateToResponse(attachment: AdminAttachment): AttachmentResponse
    {
        return this.makeResponse(attachment);
    }

    /**
     * Map array of aggregates to array responses
     * @param attachments
     */
    mapAggregatesToResponses(attachments: AdminAttachment[]): AttachmentResponse[]
    {
        if (!Array.isArray(attachments)) return;

        return attachments.map(attachment => this.makeResponse(attachment));
    }

    private makeAggregate(attachment: ObjectLiteral, cQMetadata?: CQMetadata): AdminAttachment
    {
        return AdminAttachment.register(
            new AttachmentId(attachment.id),
            new AttachmentCommonId(attachment.commonId),
            new AttachmentLangId(attachment.langId),
            new AttachmentAttachableModel(attachment.attachableModel),
            new AttachmentAttachableId(attachment.attachableId),
            new AttachmentFamilyId(attachment.familyId),
            new AttachmentSort(attachment.sort),
            new AttachmentAlt(attachment.alt),
            new AttachmentTitle(attachment.title),
            new AttachmentDescription(attachment.description),
            new AttachmentExcerpt(attachment.excerpt),
            new AttachmentName(attachment.name),
            new AttachmentPathname(attachment.pathname),
            new AttachmentFilename(attachment.filename),
            new AttachmentUrl(attachment.url),
            new AttachmentMime(attachment.mime),
            new AttachmentExtension(attachment.extension),
            new AttachmentSize(attachment.size),
            new AttachmentWidth(attachment.width),
            new AttachmentHeight(attachment.height),
            new AttachmentLibraryId(attachment.libraryId),
            new AttachmentLibraryFilename(attachment.libraryFilename),
            new AttachmentData(attachment.data),
            new AttachmentCreatedAt(attachment.createdAt, {}, {addTimezone: cQMetadata?.timezone}),
            new AttachmentUpdatedAt(attachment.updatedAt, {}, {addTimezone: cQMetadata?.timezone}),
            new AttachmentDeletedAt(attachment.deletedAt, {}, {addTimezone: cQMetadata?.timezone}),
            this.options.eagerLoading ? new AttachmentFamilyMapper({ eagerLoading: false }).mapModelToAggregate(attachment.family) : undefined,
            this.options.eagerLoading ? new AttachmentLibraryMapper({ eagerLoading: false }).mapModelToAggregate(attachment.library) : undefined,
        );
    }

    private makeResponse(attachment: AdminAttachment): AttachmentResponse
    {
        if (!attachment) return;

        return new AttachmentResponse(
            attachment.id.value,
            attachment.commonId.value,
            attachment.langId.value,
            attachment.attachableModel.value,
            attachment.attachableId.value,
            attachment.familyId.value,
            attachment.sort.value,
            attachment.alt.value,
            attachment.title.value,
            attachment.description.value,
            attachment.excerpt.value,
            attachment.name.value,
            attachment.pathname.value,
            attachment.filename.value,
            attachment.url.value,
            attachment.mime.value,
            attachment.extension.value,
            attachment.size.value,
            attachment.width.value,
            attachment.height.value,
            attachment.libraryId.value,
            attachment.libraryFilename.value,
            attachment.data.value,
            attachment.createdAt.value,
            attachment.updatedAt.value,
            attachment.deletedAt.value,
            this.options.eagerLoading ? new AttachmentFamilyMapper({ eagerLoading: false }).mapAggregateToResponse(attachment.family) : undefined,
            this.options.eagerLoading ? new AttachmentLibraryMapper({ eagerLoading: false }).mapAggregateToResponse(attachment.library) : undefined,
        );
    }
}