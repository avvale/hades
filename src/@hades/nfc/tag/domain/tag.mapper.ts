import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { NfcTag } from './tag.aggregate';
import { TagResponse } from './tag.response';
import { 
    TagId, 
    TagCode, 
    TagTenantId, 
    TagTenantCode, 
    TagUrlBase, 
    TagParams, 
    TagOffset, 
    TagIsSessionRequired, 
    TagCreatedAt, 
    TagUpdatedAt, 
    TagDeletedAt
    
} from './value-objects';

export class TagMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param tag
     */
    mapObjectToAggregate(tag: ObjectLiteral): NfcTag
    {
        return this.makeAggregate(tag);
    }

    /**
     * Map array of objects to array aggregates
     * @param tags 
     */
    mapObjectsToAggregates(tags: ObjectLiteral[]): NfcTag[]
    {
        return tags.map(tag  => this.makeAggregate(tag ));
    }

    /**
     * Map aggregate to response
     * @param tag 
     */
    mapAggregateToResponse(tag: NfcTag): TagResponse
    {
        return this.makeResponse(tag);
    }

    /**
     * Map array of aggregates to array responses
     * @param tags
     */
    mapAggregatesToResponses(tags: NfcTag[]): TagResponse[]
    {
        return tags.map(tag => this.makeResponse(tag));
    }

    private makeAggregate(tag: ObjectLiteral): NfcTag
    {
        return NfcTag.register(
            new TagId(tag.id),
            new TagCode(tag.code),
            new TagTenantId(tag.tenantId),
            new TagTenantCode(tag.tenantCode),
            new TagUrlBase(tag.urlBase),
            new TagParams(tag.params),
            new TagOffset(tag.offset),
            new TagIsSessionRequired(tag.isSessionRequired),
            new TagCreatedAt(tag.createdAt),
            new TagUpdatedAt(tag.updatedAt),
            new TagDeletedAt(tag.deletedAt),
              
        );
    }

    private makeResponse(tag: NfcTag): TagResponse
    {
        return new TagResponse(
            tag.id.value,
            tag.code.value,
            tag.tenantId.value,
            tag.tenantCode.value,
            tag.urlBase.value,
            tag.params.value,
            tag.offset.value,
            tag.isSessionRequired.value,
            tag.createdAt.value,
            tag.updatedAt.value,
            tag.deletedAt.value,
            
        );
    }
}