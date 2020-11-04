import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    ChannelOverviewId,
    ChannelOverviewTenantId,
    ChannelOverviewTenantCode,
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
    ChannelOverviewDeletedAt,
} from './../../domain/value-objects';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { CciChannelOverview } from './../../domain/channel-overview.aggregate';
import { AddChannelsOverviewContextEvent } from './../events/add-channels-overview-context.event';

@Injectable()
export class CreateChannelsOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelOverviewRepository,
    ) {}

    public async main(
        channelsOverview: {
            id: ChannelOverviewId,
            tenantId: ChannelOverviewTenantId,
            tenantCode: ChannelOverviewTenantCode,
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
        // create aggregate with factory pattern
        const aggregateChannelsOverview = channelsOverview.map(channelOverview => CciChannelOverview.register(
            channelOverview.id,
            channelOverview.tenantId,
            channelOverview.tenantCode,
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
            new ChannelOverviewCreatedAt({currentTimestamp: true}),
            new ChannelOverviewUpdatedAt({currentTimestamp: true}),
            null
        ));

        // insert
        await this.repository.insert(aggregateChannelsOverview);

        // create AddChannelsOverviewContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const channelsOverviewRegistered = this.publisher.mergeObjectContext(new AddChannelsOverviewContextEvent(aggregateChannelsOverview));

        channelsOverviewRegistered.created(); // apply event to model events
        channelsOverviewRegistered.commit(); // commit all events of model
    }
}