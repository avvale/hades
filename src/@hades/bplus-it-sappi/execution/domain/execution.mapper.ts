import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiExecution } from './execution.aggregate';
import { ExecutionResponse } from './execution.response';
import { 
    ExecutionId, 
    ExecutionTenantId, 
    ExecutionTenantCode, 
    ExecutionSystemId, 
    ExecutionSystemName, 
    ExecutionType, 
    ExecutionMonitoringStartAt, 
    ExecutionMonitoringEndAt, 
    ExecutionExecutedAt, 
    ExecutionCreatedAt, 
    ExecutionUpdatedAt, 
    ExecutionDeletedAt
    
} from './value-objects';

export class ExecutionMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param execution
     */
    mapObjectToAggregate(execution: ObjectLiteral): BplusItSappiExecution
    {
        return this.makeAggregate(execution);
    }

    /**
     * Map array of objects to array aggregates
     * @param executions 
     */
    mapObjectsToAggregates(executions: ObjectLiteral[]): BplusItSappiExecution[]
    {
        return executions.map(execution  => this.makeAggregate(execution ));
    }

    /**
     * Map aggregate to response
     * @param execution 
     */
    mapAggregateToResponse(execution: BplusItSappiExecution): ExecutionResponse
    {
        return this.makeResponse(execution);
    }

    /**
     * Map array of aggregates to array responses
     * @param executions
     */
    mapAggregatesToResponses(executions: BplusItSappiExecution[]): ExecutionResponse[]
    {
        return executions.map(execution => this.makeResponse(execution));
    }

    private makeAggregate(execution: ObjectLiteral): BplusItSappiExecution
    {
        return BplusItSappiExecution.register(
            new ExecutionId(execution.id),
            new ExecutionTenantId(execution.tenantId),
            new ExecutionTenantCode(execution.tenantCode),
            new ExecutionSystemId(execution.systemId),
            new ExecutionSystemName(execution.systemName),
            new ExecutionType(execution.type),
            new ExecutionMonitoringStartAt(execution.monitoringStartAt),
            new ExecutionMonitoringEndAt(execution.monitoringEndAt),
            new ExecutionExecutedAt(execution.executedAt),
            new ExecutionCreatedAt(execution.createdAt),
            new ExecutionUpdatedAt(execution.updatedAt),
            new ExecutionDeletedAt(execution.deletedAt),
              
        );
    }

    private makeResponse(execution: BplusItSappiExecution): ExecutionResponse
    {
        return new ExecutionResponse(
            execution.id.value,
            execution.tenantId.value,
            execution.tenantCode.value,
            execution.systemId.value,
            execution.systemName.value,
            execution.type.value,
            execution.monitoringStartAt.value,
            execution.monitoringEndAt.value,
            execution.executedAt.value,
            execution.createdAt.value,
            execution.updatedAt.value,
            execution.deletedAt.value,
            
        );
    }
}