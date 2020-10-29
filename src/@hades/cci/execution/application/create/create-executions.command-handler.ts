import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateExecutionsCommand } from './create-executions.command';
import { CreateExecutionsService } from './create-executions.service';
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

@CommandHandler(CreateExecutionsCommand)
export class CreateExecutionsCommandHandler implements ICommandHandler<CreateExecutionsCommand>
{
    constructor(
        private readonly createExecutionsService: CreateExecutionsService,
    ) {}

    async execute(command: CreateExecutionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createExecutionsService.main(
            command.executions
                .map(execution => {
                    return {
                        id: new ExecutionId(execution.id),
                        tenantId: new ExecutionTenantId(execution.tenantId),
                        tenantCode: new ExecutionTenantCode(execution.tenantCode),
                        systemId: new ExecutionSystemId(execution.systemId),
                        systemName: new ExecutionSystemName(execution.systemName),
                        version: new ExecutionVersion(execution.version),
                        type: new ExecutionType(execution.type),
                        executedAt: new ExecutionExecutedAt(execution.executedAt),
                        monitoringStartAt: new ExecutionMonitoringStartAt(execution.monitoringStartAt),
                        monitoringEndAt: new ExecutionMonitoringEndAt(execution.monitoringEndAt),
                    }
                })
        );
    }
}