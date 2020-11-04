import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMessageOverviewCommand } from './create-message-overview.command';
import { CreateMessageOverviewService } from './create-message-overview.service';
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

@CommandHandler(CreateMessageOverviewCommand)
export class CreateMessageOverviewCommandHandler implements ICommandHandler<CreateMessageOverviewCommand>
{
    constructor(
        private readonly createMessageOverviewService: CreateMessageOverviewService,
    ) {}

    async execute(command: CreateMessageOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createMessageOverviewService.main(
            {
                id: new MessageOverviewId(command.payload.id),
                tenantId: new MessageOverviewTenantId(command.payload.tenantId),
                tenantCode: new MessageOverviewTenantCode(command.payload.tenantCode),
                systemId: new MessageOverviewSystemId(command.payload.systemId),
                systemName: new MessageOverviewSystemName(command.payload.systemName),
                executionId: new MessageOverviewExecutionId(command.payload.executionId),
                executionType: new MessageOverviewExecutionType(command.payload.executionType),
                executionExecutedAt: new MessageOverviewExecutionExecutedAt(command.payload.executionExecutedAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringStartAt: new MessageOverviewExecutionMonitoringStartAt(command.payload.executionMonitoringStartAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringEndAt: new MessageOverviewExecutionMonitoringEndAt(command.payload.executionMonitoringEndAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                numberMax: new MessageOverviewNumberMax(command.payload.numberMax),
                numberDays: new MessageOverviewNumberDays(command.payload.numberDays),
                success: new MessageOverviewSuccess(command.payload.success),
                cancelled: new MessageOverviewCancelled(command.payload.cancelled),
                delivering: new MessageOverviewDelivering(command.payload.delivering),
                error: new MessageOverviewError(command.payload.error),
                holding: new MessageOverviewHolding(command.payload.holding),
                toBeDelivered: new MessageOverviewToBeDelivered(command.payload.toBeDelivered),
                waiting: new MessageOverviewWaiting(command.payload.waiting),
            }
        );
    }
}