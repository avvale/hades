import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertExecutionsCommand } from './insert-executions.command';
import { InsertExecutionsService } from './insert-executions.service';
import { 
    ExecutionId, 
    ExecutionTenantId, 
    ExecutionSystemId, 
    ExecutionType, 
    ExecutionMonitoringStartAt, 
    ExecutionMonitoringEndAt, 
    ExecutionExecutedAt
    
} from './../../domain/value-objects';

@CommandHandler(InsertExecutionsCommand)
export class InsertExecutionsCommandHandler implements ICommandHandler<InsertExecutionsCommand>
{
    constructor(
        private readonly insertExecutionsService: InsertExecutionsService
    ) { }

    async execute(command: InsertExecutionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertExecutionsService.main(
            command.executions
                .map(execution => { 
                    return {
                        id: new ExecutionId(execution.id),
                        tenantId: new ExecutionTenantId(execution.tenantId),
                        systemId: new ExecutionSystemId(execution.systemId),
                        type: new ExecutionType(execution.type),
                        monitoringStartAt: new ExecutionMonitoringStartAt(execution.monitoringStartAt),
                        monitoringEndAt: new ExecutionMonitoringEndAt(execution.monitoringEndAt),
                        executedAt: new ExecutionExecutedAt(execution.executedAt),
                        
                    }
                })
        );
    }
}