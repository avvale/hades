import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { NfcAction } from './../../domain/action.aggregate';
import { 
    ActionId, 
    ActionTagId, 
    ActionType, 
    ActionSectionId, 
    ActionData, 
    ActionCreatedAt, 
    ActionUpdatedAt, 
    ActionDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeActionMapper implements SequelizeMapper
{
    mapToAggregate(action: ObjectLiteral | ObjectLiteral[]): NfcAction | NfcAction[]
    {
        if (Array.isArray(action))
        {
            return action.map(item => NfcAction.register(
                    new ActionId(item.id),
                    new ActionTagId(item.tagId),
                    new ActionType(item.type),
                    new ActionSectionId(item.sectionId),
                    new ActionData(item.data),
                    new ActionCreatedAt(item.createdAt),
                    new ActionUpdatedAt(item.updatedAt),
                    new ActionDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return NfcAction.register(
            new ActionId(action.id),
            new ActionTagId(action.tagId),
            new ActionType(action.type),
            new ActionSectionId(action.sectionId),
            new ActionData(action.data),
            new ActionCreatedAt(action.createdAt),
            new ActionUpdatedAt(action.updatedAt),
            new ActionDeletedAt(action.deletedAt),
            
        );
    }
}