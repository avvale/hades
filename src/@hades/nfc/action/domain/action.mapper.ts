import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { NfcAction } from './action.aggregate';
import { ActionResponse } from './action.response';
import { 
    ActionId, 
    ActionTagId, 
    ActionType, 
    ActionSectionId, 
    ActionData, 
    ActionCreatedAt, 
    ActionUpdatedAt, 
    ActionDeletedAt
    
} from './value-objects';

export class ActionMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param action
     */
    mapObjectToAggregate(action: ObjectLiteral): NfcAction
    {
        return this.makeAggregate(action);
    }

    /**
     * Map array of objects to array aggregates
     * @param actions 
     */
    mapObjectsToAggregates(actions: ObjectLiteral[]): NfcAction[]
    {
        return actions.map(action  => this.makeAggregate(action ));
    }

    /**
     * Map aggregate to response
     * @param action 
     */
    mapAggregateToResponse(action: NfcAction): ActionResponse
    {
        return this.makeResponse(action);
    }

    /**
     * Map array of aggregates to array responses
     * @param actions
     */
    mapAggregatesToResponses(actions: NfcAction[]): ActionResponse[]
    {
        return actions.map(action => this.makeResponse(action));
    }

    private makeAggregate(action: ObjectLiteral): NfcAction
    {
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

    private makeResponse(action: NfcAction): ActionResponse
    {
        return new ActionResponse(
            action.id.value,
            action.tagId.value,
            action.type.value,
            action.sectionId.value,
            action.data.value,
            action.createdAt.value,
            action.updatedAt.value,
            action.deletedAt.value,
            
        );
    }
}