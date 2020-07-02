import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiExecution } from './../../domain/execution.entity';
import { 
    ExecutionId, 
    ExecutionTenantId, 
    ExecutionSystemId, 
    ExecutionType, 
    ExecutionMonitoringStartAt, 
    ExecutionMonitoringEndAt, 
    ExecutionExecutedAt, 
    ExecutionCreatedAt, 
    ExecutionUpdatedAt, 
    ExecutionDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeExecutionMapper implements SequelizeMapper
{
    mapToAggregate(execution: ObjectLiteral | ObjectLiteral[]): BplusItSappiExecution | BplusItSappiExecution[]
    {
        if (Array.isArray(execution))
        {
            return execution.map(item => BplusItSappiExecution.register(
                    new ExecutionId(item.id),
                    new ExecutionTenantId(item.tenantId),
                    new ExecutionSystemId(item.systemId),
                    new ExecutionType(item.type),
                    new ExecutionMonitoringStartAt(item.monitoringStartAt),
                    new ExecutionMonitoringEndAt(item.monitoringEndAt),
                    new ExecutionExecutedAt(item.executedAt),
                    new ExecutionCreatedAt(item.createdAt),
                    new ExecutionUpdatedAt(item.updatedAt),
                    new ExecutionDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return BplusItSappiExecution.register(
            new ExecutionId(execution.id),
            new ExecutionTenantId(execution.tenantId),
            new ExecutionSystemId(execution.systemId),
            new ExecutionType(execution.type),
            new ExecutionMonitoringStartAt(execution.monitoringStartAt),
            new ExecutionMonitoringEndAt(execution.monitoringEndAt),
            new ExecutionExecutedAt(execution.executedAt),
            new ExecutionCreatedAt(execution.createdAt),
            new ExecutionUpdatedAt(execution.updatedAt),
            new ExecutionDeletedAt(execution.deletedAt),
            
        );
    }
}