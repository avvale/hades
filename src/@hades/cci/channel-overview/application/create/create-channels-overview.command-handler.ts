import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChannelsOverviewCommand } from './create-channels-overview.command';
import { CreateChannelsOverviewService } from './create-channels-overview.service';
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

@CommandHandler(CreateChannelsOverviewCommand)
export class CreateChannelsOverviewCommandHandler implements ICommandHandler<CreateChannelsOverviewCommand>
{
    constructor(
        private readonly createChannelsOverviewService: CreateChannelsOverviewService,
    ) {}

    async execute(command: CreateChannelsOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createChannelsOverviewService.main(
            command.payload
                .map(channelOverview => {
                    return {
                        id: new ChannelOverviewId(channelOverview.id),
                        tenantId: new ChannelOverviewTenantId(channelOverview.tenantId),
                        tenantCode: new ChannelOverviewTenantCode(channelOverview.tenantCode),
                        systemId: new ChannelOverviewSystemId(channelOverview.systemId),
                        systemName: new ChannelOverviewSystemName(channelOverview.systemName),
                        executionId: new ChannelOverviewExecutionId(channelOverview.executionId),
                        executionType: new ChannelOverviewExecutionType(channelOverview.executionType),
                        executionExecutedAt: new ChannelOverviewExecutionExecutedAt(channelOverview.executionExecutedAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                        executionMonitoringStartAt: new ChannelOverviewExecutionMonitoringStartAt(channelOverview.executionMonitoringStartAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                        executionMonitoringEndAt: new ChannelOverviewExecutionMonitoringEndAt(channelOverview.executionMonitoringEndAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                        error: new ChannelOverviewError(channelOverview.error),
                        inactive: new ChannelOverviewInactive(channelOverview.inactive),
                        successful: new ChannelOverviewSuccessful(channelOverview.successful),
                        stopped: new ChannelOverviewStopped(channelOverview.stopped),
                        unknown: new ChannelOverviewUnknown(channelOverview.unknown),
                        unregistered: new ChannelOverviewUnregistered(channelOverview.unregistered),
                    }
                })
        );
    }
}