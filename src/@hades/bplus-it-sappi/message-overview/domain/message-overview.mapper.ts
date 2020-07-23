import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiMessageOverview } from './message-overview.aggregate';
import { MessageOverviewResponse } from './message-overview.response';
import { 
    MessageOverviewId, 
    MessageOverviewTenantId, 
    MessageOverviewTenantCode, 
    MessageOverviewSystemId, 
    MessageOverviewSystemName, 
    MessageOverviewExecutionId, 
    MessageOverviewExecutionType, 
    MessageOverviewExecutionExecutedAt, 
    MessageOverviewExecutionMonitoringStartAt, 
    MessageOverviewExecutionMonitoringEndAt, 
    MessageOverviewNumberMax, 
    MessageOverviewNumberDays, 
    MessageOverviewSuccess, 
    MessageOverviewCancelled, 
    MessageOverviewDelivering, 
    MessageOverviewError, 
    MessageOverviewHolding, 
    MessageOverviewToBeDelivered, 
    MessageOverviewWaiting, 
    MessageOverviewCreatedAt, 
    MessageOverviewUpdatedAt, 
    MessageOverviewDeletedAt
    
} from './value-objects';

export class MessageOverviewMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param messageOverview
     */
    mapObjectToAggregate(messageOverview: ObjectLiteral): BplusItSappiMessageOverview
    {
        return this.makeAggregate(messageOverview);
    }

    /**
     * Map array of objects to array aggregates
     * @param messagesOverview 
     */
    mapObjectsToAggregates(messagesOverview: ObjectLiteral[]): BplusItSappiMessageOverview[]
    {
        return messagesOverview.map(messageOverview  => this.makeAggregate(messageOverview ));
    }

    /**
     * Map aggregate to response
     * @param messageOverview 
     */
    mapAggregateToResponse(messageOverview: BplusItSappiMessageOverview): MessageOverviewResponse
    {
        return this.makeResponse(messageOverview);
    }

    /**
     * Map array of aggregates to array responses
     * @param messagesOverview
     */
    mapAggregatesToResponses(messagesOverview: BplusItSappiMessageOverview[]): MessageOverviewResponse[]
    {
        return messagesOverview.map(messageOverview => this.makeResponse(messageOverview));
    }

    private makeAggregate(messageOverview: ObjectLiteral): BplusItSappiMessageOverview
    {
        return BplusItSappiMessageOverview.register(
            new MessageOverviewId(messageOverview.id),
            new MessageOverviewTenantId(messageOverview.tenantId),
            new MessageOverviewTenantCode(messageOverview.tenantCode),
            new MessageOverviewSystemId(messageOverview.systemId),
            new MessageOverviewSystemName(messageOverview.systemName),
            new MessageOverviewExecutionId(messageOverview.executionId),
            new MessageOverviewExecutionType(messageOverview.executionType),
            new MessageOverviewExecutionExecutedAt(messageOverview.executionExecutedAt),
            new MessageOverviewExecutionMonitoringStartAt(messageOverview.executionMonitoringStartAt),
            new MessageOverviewExecutionMonitoringEndAt(messageOverview.executionMonitoringEndAt),
            new MessageOverviewNumberMax(messageOverview.numberMax),
            new MessageOverviewNumberDays(messageOverview.numberDays),
            new MessageOverviewSuccess(messageOverview.success),
            new MessageOverviewCancelled(messageOverview.cancelled),
            new MessageOverviewDelivering(messageOverview.delivering),
            new MessageOverviewError(messageOverview.error),
            new MessageOverviewHolding(messageOverview.holding),
            new MessageOverviewToBeDelivered(messageOverview.toBeDelivered),
            new MessageOverviewWaiting(messageOverview.waiting),
            new MessageOverviewCreatedAt(messageOverview.createdAt),
            new MessageOverviewUpdatedAt(messageOverview.updatedAt),
            new MessageOverviewDeletedAt(messageOverview.deletedAt),
              
        );
    }

    private makeResponse(messageOverview: BplusItSappiMessageOverview): MessageOverviewResponse
    {
        return new MessageOverviewResponse(
            messageOverview.id.value,
            messageOverview.tenantId.value,
            messageOverview.tenantCode.value,
            messageOverview.systemId.value,
            messageOverview.systemName.value,
            messageOverview.executionId.value,
            messageOverview.executionType.value,
            messageOverview.executionExecutedAt.value,
            messageOverview.executionMonitoringStartAt.value,
            messageOverview.executionMonitoringEndAt.value,
            messageOverview.numberMax.value,
            messageOverview.numberDays.value,
            messageOverview.success.value,
            messageOverview.cancelled.value,
            messageOverview.delivering.value,
            messageOverview.error.value,
            messageOverview.holding.value,
            messageOverview.toBeDelivered.value,
            messageOverview.waiting.value,
            messageOverview.createdAt.value,
            messageOverview.updatedAt.value,
            messageOverview.deletedAt.value,
            
        );
    }
}