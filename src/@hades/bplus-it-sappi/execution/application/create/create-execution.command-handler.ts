import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateExecutionCommand } from './create-execution.command';
import { CreateExecutionService } from './create-execution.service';
import { 
    ExecutionId, 
    ExecutionTenantId, 
    ExecutionTenantCode, 
    ExecutionVersion, 
    ExecutionSystemId, 
    ExecutionSystemName, 
    ExecutionType, 
    ExecutionMonitoringStartAt, 
    ExecutionMonitoringEndAt, 
    ExecutionExecutedAt
    
} from './../../domain/value-objects';

@CommandHandler(CreateExecutionCommand)
export class CreateExecutionCommandHandler implements ICommandHandler<CreateExecutionCommand>
{
    constructor(
        private readonly createExecutionService: CreateExecutionService
    ) { }

    async execute(command: CreateExecutionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createExecutionService.main(
            new ExecutionId(command.id),
            new ExecutionTenantId(command.tenantId),
            new ExecutionTenantCode(command.tenantCode),
            new ExecutionVersion(command.version),
            new ExecutionSystemId(command.systemId),
            new ExecutionSystemName(command.systemName),
            new ExecutionType(command.type),
            new ExecutionMonitoringStartAt(command.monitoringStartAt),
            new ExecutionMonitoringEndAt(command.monitoringEndAt),
            new ExecutionExecutedAt(command.executedAt),
            
        );
    }
}