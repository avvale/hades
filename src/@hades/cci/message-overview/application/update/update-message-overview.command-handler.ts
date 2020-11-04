import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMessageOverviewCommand } from './update-message-overview.command';
import { UpdateMessageOverviewService } from './update-message-overview.service';
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
    MessageOverviewDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(UpdateMessageOverviewCommand)
export class UpdateMessageOverviewCommandHandler implements ICommandHandler<UpdateMessageOverviewCommand>
{
    constructor(
        private readonly updateMessageOverviewService: UpdateMessageOverviewService,
    ) {}

    async execute(command: UpdateMessageOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateMessageOverviewService.main(
            {
                id: new MessageOverviewId(command.payload.id),
                tenantId: new MessageOverviewTenantId(command.payload.tenantId, { undefinable: true }),
                tenantCode: new MessageOverviewTenantCode(command.payload.tenantCode, { undefinable: true }),
                systemId: new MessageOverviewSystemId(command.payload.systemId, { undefinable: true }),
                systemName: new MessageOverviewSystemName(command.payload.systemName, { undefinable: true }),
                executionId: new MessageOverviewExecutionId(command.payload.executionId, { undefinable: true }),
                executionType: new MessageOverviewExecutionType(command.payload.executionType, { undefinable: true }),
                executionExecutedAt: new MessageOverviewExecutionExecutedAt(command.payload.executionExecutedAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringStartAt: new MessageOverviewExecutionMonitoringStartAt(command.payload.executionMonitoringStartAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringEndAt: new MessageOverviewExecutionMonitoringEndAt(command.payload.executionMonitoringEndAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                numberMax: new MessageOverviewNumberMax(command.payload.numberMax),
                numberDays: new MessageOverviewNumberDays(command.payload.numberDays),
                success: new MessageOverviewSuccess(command.payload.success),
                cancelled: new MessageOverviewCancelled(command.payload.cancelled),
                delivering: new MessageOverviewDelivering(command.payload.delivering),
                error: new MessageOverviewError(command.payload.error),
                holding: new MessageOverviewHolding(command.payload.holding),
                toBeDelivered: new MessageOverviewToBeDelivered(command.payload.toBeDelivered),
                waiting: new MessageOverviewWaiting(command.payload.waiting),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}