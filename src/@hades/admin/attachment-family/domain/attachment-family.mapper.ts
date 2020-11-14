import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { AdminAttachmentFamily } from './attachment-family.aggregate';
import { AttachmentFamilyResponse } from './attachment-family.response';
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
} from './value-objects';
import { ResourceMapper } from '@hades/admin/resource/domain/resource.mapper';

export class AttachmentFamilyMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param attachmentFamily
     */
    mapModelToAggregate(attachmentFamily: ObjectLiteral, cQMetadata?: CQMetadata): AdminAttachmentFamily
    {
        if (!attachmentFamily) return;

        return this.makeAggregate(attachmentFamily, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param attachmentFamilies
     */
    mapModelsToAggregates(attachmentFamilies: ObjectLiteral[], cQMetadata?: CQMetadata): AdminAttachmentFamily[]
    {
        if (!Array.isArray(attachmentFamilies)) return;

        return attachmentFamilies.map(attachmentFamily  => this.makeAggregate(attachmentFamily, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param attachmentFamily
     */
    mapAggregateToResponse(attachmentFamily: AdminAttachmentFamily): AttachmentFamilyResponse
    {
        return this.makeResponse(attachmentFamily);
    }

    /**
     * Map array of aggregates to array responses
     * @param attachmentFamilies
     */
    mapAggregatesToResponses(attachmentFamilies: AdminAttachmentFamily[]): AttachmentFamilyResponse[]
    {
        if (!Array.isArray(attachmentFamilies)) return;

        return attachmentFamilies.map(attachmentFamily => this.makeResponse(attachmentFamily));
    }

    private makeAggregate(attachmentFamily: ObjectLiteral, cQMetadata?: CQMetadata): AdminAttachmentFamily
    {
        return AdminAttachmentFamily.register(
            new AttachmentFamilyId(attachmentFamily.id),
            new AttachmentFamilyName(attachmentFamily.name),
            new AttachmentFamilyResourceIds(attachmentFamily.resourceIds),
            new AttachmentFamilyWidth(attachmentFamily.width),
            new AttachmentFamilyHeight(attachmentFamily.height),
            new AttachmentFamilyFit(attachmentFamily.fit),
            new AttachmentFamilySizes(attachmentFamily.sizes),
            new AttachmentFamilyQuality(attachmentFamily.quality),
            new AttachmentFamilyFormat(attachmentFamily.format),
            new AttachmentFamilyCreatedAt(attachmentFamily.createdAt, {}, {addTimezone: cQMetadata?.timezone}),
            new AttachmentFamilyUpdatedAt(attachmentFamily.updatedAt, {}, {addTimezone: cQMetadata?.timezone}),
            new AttachmentFamilyDeletedAt(attachmentFamily.deletedAt, {}, {addTimezone: cQMetadata?.timezone}),
            this.options.eagerLoading ? new ResourceMapper({ eagerLoading: false }).mapModelsToAggregates(attachmentFamily.resources) : undefined,
        );
    }

    private makeResponse(attachmentFamily: AdminAttachmentFamily): AttachmentFamilyResponse
    {
        if (!attachmentFamily) return;

        return new AttachmentFamilyResponse(
            attachmentFamily.id.value,
            attachmentFamily.name.value,
            attachmentFamily.resourceIds.value,
            attachmentFamily.width.value,
            attachmentFamily.height.value,
            attachmentFamily.fit.value,
            attachmentFamily.sizes.value,
            attachmentFamily.quality.value,
            attachmentFamily.format.value,
            attachmentFamily.createdAt.value,
            attachmentFamily.updatedAt.value,
            attachmentFamily.deletedAt.value,
            this.options.eagerLoading ? new ResourceMapper({ eagerLoading: false }).mapAggregatesToResponses(attachmentFamily.resources) : undefined,
        );
    }
}