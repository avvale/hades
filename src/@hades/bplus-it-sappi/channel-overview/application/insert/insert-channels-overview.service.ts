import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { BplusItSappiChannelOverview } from './../../domain/channel-overview.aggregate';

@Injectable()
export class InsertChannelsOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelOverviewRepository
    ) {}

    public async main(
        channelsOverview: {
            id: ChannelOverviewId,
            tenantId: ChannelOverviewTenantId,
            systemId: ChannelOverviewSystemId,
            systemName: ChannelOverviewSystemName,
            executionId: ChannelOverviewExecutionId,
            executionType: ChannelOverviewExecutionType,
            executionExecutedAt: ChannelOverviewExecutionExecutedAt,
            executionMonitoringStartAt: ChannelOverviewExecutionMonitoringStartAt,
            executionMonitoringEndAt: ChannelOverviewExecutionMonitoringEndAt,
            error: ChannelOverviewError,
            inactive: ChannelOverviewInactive,
            successful: ChannelOverviewSuccessful,
            stopped: ChannelOverviewStopped,
            unknown: ChannelOverviewUnknown,
            unregistered: ChannelOverviewUnregistered,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateChannelsOverview = channelsOverview.map(channelOverview => BplusItSappiChannelOverview.register(
            channelOverview.id,
            channelOverview.tenantId,
            channelOverview.systemId,
            channelOverview.systemName,
            channelOverview.executionId,
            channelOverview.executionType,
            channelOverview.executionExecutedAt,
            channelOverview.executionMonitoringStartAt,
            channelOverview.executionMonitoringEndAt,
            channelOverview.error,
            channelOverview.inactive,
            channelOverview.successful,
            channelOverview.stopped,
            channelOverview.unknown,
            channelOverview.unregistered,
            new ChannelOverviewCreatedAt(Utils.nowTimestamp()),
            new ChannelOverviewUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateChannelsOverview);

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const channelsOverviewRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id) // there may be cases where the database object is direct to the command, for example in the update, only one field can be updated
        // );
        // 
        // channelsOverviewRegistered.created(channelsOverview); // apply event to model events
        // channelsOverviewRegistered.commit(); // commit all events of model
    }
}