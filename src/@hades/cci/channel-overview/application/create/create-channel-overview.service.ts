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

@Injectable()
export class CreateChannelOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelOverviewRepository,
    ) {}

    public async main(
        payload: {
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
        }
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const channelOverview = CciChannelOverview.register(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.error,
            payload.inactive,
            payload.successful,
            payload.stopped,
            payload.unknown,
            payload.unregistered,
            new ChannelOverviewCreatedAt({currentTimestamp: true}),
            new ChannelOverviewUpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create(channelOverview);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const channelOverviewRegister = this.publisher.mergeObjectContext(
            channelOverview
        );

        channelOverviewRegister.created(channelOverview); // apply event to model events
        channelOverviewRegister.commit(); // commit all events of model
    }
}