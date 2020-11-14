import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { AdminResource } from './resource.aggregate';
import { ResourceResponse } from './resource.response';
import {
    ResourceId,
    ResourceBoundedContextId,
    ResourceAttachmentFamilyIds,
    ResourceName,
    ResourceHasCustomFields,
    ResourceHasAttachments,
    ResourceCreatedAt,
    ResourceUpdatedAt,
    ResourceDeletedAt,
} from './value-objects';
import { BoundedContextMapper } from '@hades/iam/bounded-context/domain/bounded-context.mapper';
import { AttachmentFamilyMapper } from '@hades/iam/attachment-family/domain/attachment-family.mapper';

export class ResourceMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param resource
     */
    mapModelToAggregate(resource: ObjectLiteral, cQMetadata?: CQMetadata): AdminResource
    {
        if (!resource) return;

        return this.makeAggregate(resource, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param resources
     */
    mapModelsToAggregates(resources: ObjectLiteral[], cQMetadata?: CQMetadata): AdminResource[]
    {
        if (!Array.isArray(resources)) return;

        return resources.map(resource  => this.makeAggregate(resource, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param resource
     */
    mapAggregateToResponse(resource: AdminResource): ResourceResponse
    {
        return this.makeResponse(resource);
    }

    /**
     * Map array of aggregates to array responses
     * @param resources
     */
    mapAggregatesToResponses(resources: AdminResource[]): ResourceResponse[]
    {
        if (!Array.isArray(resources)) return;

        return resources.map(resource => this.makeResponse(resource));
    }

    private makeAggregate(resource: ObjectLiteral, cQMetadata?: CQMetadata): AdminResource
    {
        return AdminResource.register(
            new ResourceId(resource.id),
            new ResourceBoundedContextId(resource.boundedContextId),
            new ResourceAttachmentFamilyIds(resource.attachmentFamilyIds),
            new ResourceName(resource.name),
            new ResourceHasCustomFields(resource.hasCustomFields),
            new ResourceHasAttachments(resource.hasAttachments),
            new ResourceCreatedAt(resource.createdAt, {}, {addTimezone: cQMetadata?.timezone}),
            new ResourceUpdatedAt(resource.updatedAt, {}, {addTimezone: cQMetadata?.timezone}),
            new ResourceDeletedAt(resource.deletedAt, {}, {addTimezone: cQMetadata?.timezone}),
            this.options.eagerLoading ? new BoundedContextMapper({ eagerLoading: false }).mapModelToAggregate(resource.boundedContext) : undefined,
            this.options.eagerLoading ? new AttachmentFamilyMapper({ eagerLoading: false }).mapModelsToAggregates(resource.attachmentFamilies) : undefined,
        );
    }

    private makeResponse(resource: AdminResource): ResourceResponse
    {
        if (!resource) return;

        return new ResourceResponse(
            resource.id.value,
            resource.boundedContextId.value,
            resource.attachmentFamilyIds.value,
            resource.name.value,
            resource.hasCustomFields.value,
            resource.hasAttachments.value,
            resource.createdAt.value,
            resource.updatedAt.value,
            resource.deletedAt.value,
            this.options.eagerLoading ? new BoundedContextMapper({ eagerLoading: false }).mapAggregateToResponse(resource.boundedContext) : undefined,
            this.options.eagerLoading ? new AttachmentFamilyMapper({ eagerLoading: false }).mapAggregatesToResponses(resource.attachmentFamilies) : undefined,
        );
    }
}