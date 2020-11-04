import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateChannelOverviewCommand } from './update-channel-overview.command';
import { UpdateChannelOverviewService } from './update-channel-overview.service';
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

@CommandHandler(UpdateChannelOverviewCommand)
export class UpdateChannelOverviewCommandHandler implements ICommandHandler<UpdateChannelOverviewCommand>
{
    constructor(
        private readonly updateChannelOverviewService: UpdateChannelOverviewService,
    ) {}

    async execute(command: UpdateChannelOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateChannelOverviewService.main(
            {
                id: new ChannelOverviewId(command.payload.id),
                tenantId: new ChannelOverviewTenantId(command.payload.tenantId, { undefinable: true }),
                tenantCode: new ChannelOverviewTenantCode(command.payload.tenantCode, { undefinable: true }),
                systemId: new ChannelOverviewSystemId(command.payload.systemId, { undefinable: true }),
                systemName: new ChannelOverviewSystemName(command.payload.systemName, { undefinable: true }),
                executionId: new ChannelOverviewExecutionId(command.payload.executionId, { undefinable: true }),
                executionType: new ChannelOverviewExecutionType(command.payload.executionType, { undefinable: true }),
                executionExecutedAt: new ChannelOverviewExecutionExecutedAt(command.payload.executionExecutedAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringStartAt: new ChannelOverviewExecutionMonitoringStartAt(command.payload.executionMonitoringStartAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringEndAt: new ChannelOverviewExecutionMonitoringEndAt(command.payload.executionMonitoringEndAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                error: new ChannelOverviewError(command.payload.error),
                inactive: new ChannelOverviewInactive(command.payload.inactive),
                successful: new ChannelOverviewSuccessful(command.payload.successful),
                stopped: new ChannelOverviewStopped(command.payload.stopped),
                unknown: new ChannelOverviewUnknown(command.payload.unknown),
                unregistered: new ChannelOverviewUnregistered(command.payload.unregistered),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}