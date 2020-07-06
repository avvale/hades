import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiChannelOverview } from './../../domain/channel-overview.aggregate';
import { 
    ChannelOverviewId, 
    ChannelOverviewTenantId, 
    ChannelOverviewSystemId, 
    ChannelOverviewSystemName, 
    ChannelOverviewExecutionId, 
    ChannelOverviewExecutionType, 
    ChannelOverviewExecutionExecutedAt, 
    ChannelOverviewExecutionMonitoringStartAt, 
    ChannelOverviewExecutionMonitoringEndAt, 
    ChannelOverviewError, 
    ChannelOverviewInactive, 
    ChannelOverviewSuccessful, 
    ChannelOverviewStopped, 
    ChannelOverviewUnknown, 
    ChannelOverviewUnregistered, 
    ChannelOverviewCreatedAt, 
    ChannelOverviewUpdatedAt, 
    ChannelOverviewDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeChannelOverviewMapper implements SequelizeMapper
{
    mapToAggregate(channelOverview: ObjectLiteral | ObjectLiteral[]): BplusItSappiChannelOverview | BplusItSappiChannelOverview[]
    {
        if (Array.isArray(channelOverview))
        {
            return channelOverview.map(item => BplusItSappiChannelOverview.register(
                    new ChannelOverviewId(item.id),
                    new ChannelOverviewTenantId(item.tenantId),
                    new ChannelOverviewSystemId(item.systemId),
                    new ChannelOverviewSystemName(item.systemName),
                    new ChannelOverviewExecutionId(item.executionId),
                    new ChannelOverviewExecutionType(item.executionType),
                    new ChannelOverviewExecutionExecutedAt(item.executionExecutedAt),
                    new ChannelOverviewExecutionMonitoringStartAt(item.executionMonitoringStartAt),
                    new ChannelOverviewExecutionMonitoringEndAt(item.executionMonitoringEndAt),
                    new ChannelOverviewError(item.error),
                    new ChannelOverviewInactive(item.inactive),
                    new ChannelOverviewSuccessful(item.successful),
                    new ChannelOverviewStopped(item.stopped),
                    new ChannelOverviewUnknown(item.unknown),
                    new ChannelOverviewUnregistered(item.unregistered),
                    new ChannelOverviewCreatedAt(item.createdAt),
                    new ChannelOverviewUpdatedAt(item.updatedAt),
                    new ChannelOverviewDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return BplusItSappiChannelOverview.register(
            new ChannelOverviewId(channelOverview.id),
            new ChannelOverviewTenantId(channelOverview.tenantId),
            new ChannelOverviewSystemId(channelOverview.systemId),
            new ChannelOverviewSystemName(channelOverview.systemName),
            new ChannelOverviewExecutionId(channelOverview.executionId),
            new ChannelOverviewExecutionType(channelOverview.executionType),
            new ChannelOverviewExecutionExecutedAt(channelOverview.executionExecutedAt),
            new ChannelOverviewExecutionMonitoringStartAt(channelOverview.executionMonitoringStartAt),
            new ChannelOverviewExecutionMonitoringEndAt(channelOverview.executionMonitoringEndAt),
            new ChannelOverviewError(channelOverview.error),
            new ChannelOverviewInactive(channelOverview.inactive),
            new ChannelOverviewSuccessful(channelOverview.successful),
            new ChannelOverviewStopped(channelOverview.stopped),
            new ChannelOverviewUnknown(channelOverview.unknown),
            new ChannelOverviewUnregistered(channelOverview.unregistered),
            new ChannelOverviewCreatedAt(channelOverview.createdAt),
            new ChannelOverviewUpdatedAt(channelOverview.updatedAt),
            new ChannelOverviewDeletedAt(channelOverview.deletedAt),
            
        );
    }
}