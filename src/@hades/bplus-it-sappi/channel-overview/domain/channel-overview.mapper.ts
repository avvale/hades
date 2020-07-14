import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiChannelOverview } from './channel-overview.aggregate';
import { ChannelOverviewResponse } from './channel-overview.response';
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
    
} from './value-objects';

export class ChannelOverviewMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param channelOverview
     */
    mapObjectToAggregate(channelOverview: ObjectLiteral): BplusItSappiChannelOverview
    {
        return this.makeAggregate(channelOverview);
    }

    /**
     * Map array of objects to array aggregates
     * @param channelsOverview 
     */
    mapObjectsToAggregates(channelsOverview: ObjectLiteral[]): BplusItSappiChannelOverview[]
    {
        return channelsOverview.map(channelOverview  => this.makeAggregate(channelOverview ));
    }

    /**
     * Map aggregate to response
     * @param channelOverview 
     */
    mapAggregateToResponse(channelOverview: BplusItSappiChannelOverview): ChannelOverviewResponse
    {
        return this.makeResponse(channelOverview);
    }

    /**
     * Map array of aggregates to array responses
     * @param channelsOverview
     */
    mapAggregatesToResponses(channelsOverview: BplusItSappiChannelOverview[]): ChannelOverviewResponse[]
    {
        return channelsOverview.map(channelOverview => this.makeResponse(channelOverview));
    }

    private makeAggregate(channelOverview: ObjectLiteral): BplusItSappiChannelOverview
    {
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

    private makeResponse(channelOverview: BplusItSappiChannelOverview): ChannelOverviewResponse
    {
        return new ChannelOverviewResponse(
            channelOverview.id.value,
            channelOverview.tenantId.value,
            channelOverview.systemId.value,
            channelOverview.systemName.value,
            channelOverview.executionId.value,
            channelOverview.executionType.value,
            channelOverview.executionExecutedAt.value,
            channelOverview.executionMonitoringStartAt.value,
            channelOverview.executionMonitoringEndAt.value,
            channelOverview.error.value,
            channelOverview.inactive.value,
            channelOverview.successful.value,
            channelOverview.stopped.value,
            channelOverview.unknown.value,
            channelOverview.unregistered.value,
            channelOverview.createdAt.value,
            channelOverview.updatedAt.value,
            channelOverview.deletedAt.value,
            
        );
    }
}