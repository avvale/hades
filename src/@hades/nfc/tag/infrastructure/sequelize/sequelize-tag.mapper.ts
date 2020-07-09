import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { NfcTag } from './../../domain/tag.aggregate';
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
    
} from './../../domain/value-objects';

export class SequelizeTagMapper implements SequelizeMapper
{
    mapToAggregate(tag: ObjectLiteral | ObjectLiteral[]): NfcTag | NfcTag[]
    {
        if (Array.isArray(tag))
        {
            return tag.map(item => NfcTag.register(
                    new TagId(item.id),
                    new TagCode(item.code),
                    new TagTenantId(item.tenantId),
                    new TagTenantCode(item.tenantCode),
                    new TagUrlBase(item.urlBase),
                    new TagParams(item.params),
                    new TagOffset(item.offset),
                    new TagIsSessionRequired(item.isSessionRequired),
                    new TagCreatedAt(item.createdAt),
                    new TagUpdatedAt(item.updatedAt),
                    new TagDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
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
}