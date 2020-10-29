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
            new ExecutionId(command.id),
            new ExecutionTenantId(command.tenantId),
            new ExecutionTenantCode(command.tenantCode),
            new ExecutionSystemId(command.systemId),
            new ExecutionSystemName(command.systemName),
            new ExecutionVersion(command.version),
            new ExecutionType(command.type),
            new ExecutionExecutedAt(command.executedAt),
            new ExecutionMonitoringStartAt(command.monitoringStartAt),
            new ExecutionMonitoringEndAt(command.monitoringEndAt),
        );
    }
}