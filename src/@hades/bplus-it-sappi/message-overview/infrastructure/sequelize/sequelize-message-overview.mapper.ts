import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiMessageOverview } from './../../domain/message-overview.aggregate';
import { 
    MessageOverviewId, 
    MessageOverviewTenantId, 
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
    
} from './../../domain/value-objects';

export class SequelizeMessageOverviewMapper implements SequelizeMapper
{
    mapToAggregate(messageOverview: ObjectLiteral | ObjectLiteral[]): BplusItSappiMessageOverview | BplusItSappiMessageOverview[]
    {
        if (Array.isArray(messageOverview))
        {
            return messageOverview.map(item => BplusItSappiMessageOverview.register(
                    new MessageOverviewId(item.id),
                    new MessageOverviewTenantId(item.tenantId),
                    new MessageOverviewSystemId(item.systemId),
                    new MessageOverviewSystemName(item.systemName),
                    new MessageOverviewExecutionId(item.executionId),
                    new MessageOverviewExecutionType(item.executionType),
                    new MessageOverviewExecutionExecutedAt(item.executionExecutedAt),
                    new MessageOverviewExecutionMonitoringStartAt(item.executionMonitoringStartAt),
                    new MessageOverviewExecutionMonitoringEndAt(item.executionMonitoringEndAt),
                    new MessageOverviewNumberMax(item.numberMax),
                    new MessageOverviewNumberDays(item.numberDays),
                    new MessageOverviewSuccess(item.success),
                    new MessageOverviewCancelled(item.cancelled),
                    new MessageOverviewDelivering(item.delivering),
                    new MessageOverviewError(item.error),
                    new MessageOverviewHolding(item.holding),
                    new MessageOverviewToBeDelivered(item.toBeDelivered),
                    new MessageOverviewWaiting(item.waiting),
                    new MessageOverviewCreatedAt(item.createdAt),
                    new MessageOverviewUpdatedAt(item.updatedAt),
                    new MessageOverviewDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return BplusItSappiMessageOverview.register(
            new MessageOverviewId(messageOverview.id),
            new MessageOverviewTenantId(messageOverview.tenantId),
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
}