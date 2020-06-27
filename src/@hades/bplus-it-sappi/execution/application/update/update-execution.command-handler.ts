import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateExecutionCommand } from './update-execution.command';
import { UpdateExecutionService } from './update-execution.service';
import { 
    ExecutionId, 
    ExecutionTenantId, 
    ExecutionSystemId, 
    ExecutionType, 
    ExecutionMonitoringStartAt, 
    ExecutionMonitoringEndAt, 
    ExecutionExecutedAt
    
} from './../../domain/value-objects';

@CommandHandler(UpdateExecutionCommand)
export class UpdateExecutionCommandHandler implements ICommandHandler<UpdateExecutionCommand>
{
    constructor(
        private readonly updateExecutionService: UpdateExecutionService
    ) { }

    async execute(command: UpdateExecutionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateExecutionService.main(
            new ExecutionId(command.id),
            new ExecutionTenantId(command.tenantId, { undefinable: true }),
            new ExecutionSystemId(command.systemId, { undefinable: true }),
            new ExecutionType(command.type, { undefinable: true }),
            new ExecutionMonitoringStartAt(command.monitoringStartAt, { undefinable: true }),
            new ExecutionMonitoringEndAt(command.monitoringEndAt, { undefinable: true }),
            new ExecutionExecutedAt(command.executedAt, { undefinable: true }),
            
        )
    }
}