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
            {
                id: new ExecutionId(command.payload.id),
                tenantId: new ExecutionTenantId(command.payload.tenantId),
                tenantCode: new ExecutionTenantCode(command.payload.tenantCode),
                systemId: new ExecutionSystemId(command.payload.systemId),
                systemName: new ExecutionSystemName(command.payload.systemName),
                version: new ExecutionVersion(command.payload.version),
                type: new ExecutionType(command.payload.type),
                executedAt: new ExecutionExecutedAt(command.payload.executedAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                monitoringStartAt: new ExecutionMonitoringStartAt(command.payload.monitoringStartAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                monitoringEndAt: new ExecutionMonitoringEndAt(command.payload.monitoringEndAt, {}, {removeTimezone: command.cQMetadata.timezone}),
            }
        );
    }
}