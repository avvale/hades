import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { AdminAttachmentLibrary } from './attachment-library.aggregate';
import { AttachmentLibraryResponse } from './attachment-library.response';
import {
    AttachmentLibraryId,
    AttachmentLibraryName,
    AttachmentLibraryPathname,
    AttachmentLibraryFilename,
    AttachmentLibraryUrl,
    AttachmentLibraryMime,
    AttachmentLibraryExtension,
    AttachmentLibrarySize,
    AttachmentLibraryWidth,
    AttachmentLibraryHeight,
    AttachmentLibraryData,
    AttachmentLibraryCreatedAt,
    AttachmentLibraryUpdatedAt,
    AttachmentLibraryDeletedAt,
} from './value-objects';

export class AttachmentLibraryMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param attachmentLibrary
     */
    mapModelToAggregate(attachmentLibrary: ObjectLiteral, cQMetadata?: CQMetadata): AdminAttachmentLibrary
    {
        if (!attachmentLibrary) return;

        return this.makeAggregate(attachmentLibrary, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param attachmentLibraries
     */
    mapModelsToAggregates(attachmentLibraries: ObjectLiteral[], cQMetadata?: CQMetadata): AdminAttachmentLibrary[]
    {
        if (!Array.isArray(attachmentLibraries)) return;

        return attachmentLibraries.map(attachmentLibrary  => this.makeAggregate(attachmentLibrary, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param attachmentLibrary
     */
    mapAggregateToResponse(attachmentLibrary: AdminAttachmentLibrary): AttachmentLibraryResponse
    {
        return this.makeResponse(attachmentLibrary);
    }

    /**
     * Map array of aggregates to array responses
     * @param attachmentLibraries
     */
    mapAggregatesToResponses(attachmentLibraries: AdminAttachmentLibrary[]): AttachmentLibraryResponse[]
    {
        if (!Array.isArray(attachmentLibraries)) return;

        return attachmentLibraries.map(attachmentLibrary => this.makeResponse(attachmentLibrary));
    }

    private makeAggregate(attachmentLibrary: ObjectLiteral, cQMetadata?: CQMetadata): AdminAttachmentLibrary
    {
        return AdminAttachmentLibrary.register(
            new AttachmentLibraryId(attachmentLibrary.id),
            new AttachmentLibraryName(attachmentLibrary.name),
            new AttachmentLibraryPathname(attachmentLibrary.pathname),
            new AttachmentLibraryFilename(attachmentLibrary.filename),
            new AttachmentLibraryUrl(attachmentLibrary.url),
            new AttachmentLibraryMime(attachmentLibrary.mime),
            new AttachmentLibraryExtension(attachmentLibrary.extension),
            new AttachmentLibrarySize(attachmentLibrary.size),
            new AttachmentLibraryWidth(attachmentLibrary.width),
            new AttachmentLibraryHeight(attachmentLibrary.height),
            new AttachmentLibraryData(attachmentLibrary.data),
            new AttachmentLibraryCreatedAt(attachmentLibrary.createdAt, {}, {addTimezone: cQMetadata?.timezone}),
            new AttachmentLibraryUpdatedAt(attachmentLibrary.updatedAt, {}, {addTimezone: cQMetadata?.timezone}),
            new AttachmentLibraryDeletedAt(attachmentLibrary.deletedAt, {}, {addTimezone: cQMetadata?.timezone}),
        );
    }

    private makeResponse(attachmentLibrary: AdminAttachmentLibrary): AttachmentLibraryResponse
    {
        if (!attachmentLibrary) return;

        return new AttachmentLibraryResponse(
            attachmentLibrary.id.value,
            attachmentLibrary.name.value,
            attachmentLibrary.pathname.value,
            attachmentLibrary.filename.value,
            attachmentLibrary.url.value,
            attachmentLibrary.mime.value,
            attachmentLibrary.extension.value,
            attachmentLibrary.size.value,
            attachmentLibrary.width.value,
            attachmentLibrary.height.value,
            attachmentLibrary.data.value,
            attachmentLibrary.createdAt.value,
            attachmentLibrary.updatedAt.value,
            attachmentLibrary.deletedAt.value,
        );
    }
}