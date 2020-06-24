import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { AdminLang } from './../../domain/lang.entity';
import { 
    LangId, 
    LangName, 
    LangImage, 
    LangIso6392, 
    LangIso6393, 
    LangIetf, 
    LangSort, 
    LangIsActive, 
    LangCreatedAt, 
    LangUpdatedAt, 
    LangDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeLangMapper implements SequelizeMapper
{
    mapToEntity(lang: ObjectLiteral | ObjectLiteral[]): AdminLang | AdminLang[]
    {
        if (Array.isArray(lang))
        {
            return lang.map(item => AdminLang.register(
                    new LangId(item.id),
                    new LangName(item.name),
                    new LangImage(item.image),
                    new LangIso6392(item.iso6392),
                    new LangIso6393(item.iso6393),
                    new LangIetf(item.ietf),
                    new LangSort(item.sort),
                    new LangIsActive(item.isActive),
                    new LangCreatedAt(item.createdAt),
                    new LangUpdatedAt(item.updatedAt),
                    new LangDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return AdminLang.register(
            new LangId(lang.id),
            new LangName(lang.name),
            new LangImage(lang.image),
            new LangIso6392(lang.iso6392),
            new LangIso6393(lang.iso6393),
            new LangIetf(lang.ietf),
            new LangSort(lang.sort),
            new LangIsActive(lang.isActive),
            new LangCreatedAt(lang.createdAt),
            new LangUpdatedAt(lang.updatedAt),
            new LangDeletedAt(lang.deletedAt),
            
        );
    }
}