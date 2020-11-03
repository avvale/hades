import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateExecutionCommand } from './create-execution.command';
import { CreateExecutionService } from './create-execution.service';
import {
    ExecutionId,
    ExecutionTenantId,
    ExecutionTenantCode,
    ExecutionSystemId,
    ExecutionSystemName,
    ExecutionVersion,
    ExecutionType,
    ExecutionExecutedAt,
    ExecutionMonitoringStartAt,
    ExecutionMonitoringEndAt,
    ExecutionCreatedAt,
    ExecutionUpdatedAt,
    ExecutionDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(CreateExecutionCommand)
export class CreateExecutionCommandHandler implements ICommandHandler<CreateExecutionCommand>
{
    constructor(
        private readonly createExecutionService: CreateExecutionService,
    ) {}

    async execute(command: CreateExecutionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createExecutionService.main(
            new ExecutionId(command.payload.id),
            new ExecutionTenantId(command.payload.tenantId),
            new ExecutionTenantCode(command.payload.tenantCode),
            new ExecutionSystemId(command.payload.systemId),
            new ExecutionSystemName(command.payload.systemName),
            new ExecutionVersion(command.payload.version),
            new ExecutionType(command.payload.type),
            new ExecutionExecutedAt(command.payload.executedAt, {}, {removeTimezone: command.cQMetadata.timezone}),
            new ExecutionMonitoringStartAt(command.payload.monitoringStartAt, {}, {removeTimezone: command.cQMetadata.timezone}),
            new ExecutionMonitoringEndAt(command.payload.monitoringEndAt, {}, {removeTimezone: command.cQMetadata.timezone}),
        );
    }
}