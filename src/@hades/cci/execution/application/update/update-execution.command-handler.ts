import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateExecutionCommand } from './update-execution.command';
import { UpdateExecutionService } from './update-execution.service';
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

@CommandHandler(UpdateExecutionCommand)
export class UpdateExecutionCommandHandler implements ICommandHandler<UpdateExecutionCommand>
{
    constructor(
        private readonly updateExecutionService: UpdateExecutionService,
    ) {}

    async execute(command: UpdateExecutionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateExecutionService.main(
            {
                id: new ExecutionId(command.payload.id),
                tenantId: new ExecutionTenantId(command.payload.tenantId, { undefinable: true }),
                tenantCode: new ExecutionTenantCode(command.payload.tenantCode, { undefinable: true }),
                systemId: new ExecutionSystemId(command.payload.systemId, { undefinable: true }),
                systemName: new ExecutionSystemName(command.payload.systemName, { undefinable: true }),
                version: new ExecutionVersion(command.payload.version, { undefinable: true }),
                type: new ExecutionType(command.payload.type, { undefinable: true }),
                executedAt: new ExecutionExecutedAt(command.payload.executedAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                monitoringStartAt: new ExecutionMonitoringStartAt(command.payload.monitoringStartAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                monitoringEndAt: new ExecutionMonitoringEndAt(command.payload.monitoringEndAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}