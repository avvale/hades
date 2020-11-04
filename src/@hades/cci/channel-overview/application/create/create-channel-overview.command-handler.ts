import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChannelOverviewCommand } from './create-channel-overview.command';
import { CreateChannelOverviewService } from './create-channel-overview.service';
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

@CommandHandler(CreateChannelOverviewCommand)
export class CreateChannelOverviewCommandHandler implements ICommandHandler<CreateChannelOverviewCommand>
{
    constructor(
        private readonly createChannelOverviewService: CreateChannelOverviewService,
    ) {}

    async execute(command: CreateChannelOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createChannelOverviewService.main(
            {
                id: new ChannelOverviewId(command.payload.id),
                tenantId: new ChannelOverviewTenantId(command.payload.tenantId),
                tenantCode: new ChannelOverviewTenantCode(command.payload.tenantCode),
                systemId: new ChannelOverviewSystemId(command.payload.systemId),
                systemName: new ChannelOverviewSystemName(command.payload.systemName),
                executionId: new ChannelOverviewExecutionId(command.payload.executionId),
                executionType: new ChannelOverviewExecutionType(command.payload.executionType),
                executionExecutedAt: new ChannelOverviewExecutionExecutedAt(command.payload.executionExecutedAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringStartAt: new ChannelOverviewExecutionMonitoringStartAt(command.payload.executionMonitoringStartAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringEndAt: new ChannelOverviewExecutionMonitoringEndAt(command.payload.executionMonitoringEndAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                error: new ChannelOverviewError(command.payload.error),
                inactive: new ChannelOverviewInactive(command.payload.inactive),
                successful: new ChannelOverviewSuccessful(command.payload.successful),
                stopped: new ChannelOverviewStopped(command.payload.stopped),
                unknown: new ChannelOverviewUnknown(command.payload.unknown),
                unregistered: new ChannelOverviewUnregistered(command.payload.unregistered),
            }
        );
    }
}