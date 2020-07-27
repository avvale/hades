import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
    ExecutionExecutedAt, 
    ExecutionCreatedAt, 
    ExecutionUpdatedAt, 
    ExecutionDeletedAt
    
} from './../../domain/value-objects';
import { IExecutionRepository } from './../../domain/execution.repository';
import { BplusItSappiExecution } from './../../domain/execution.aggregate';
import { AddExecutionsContextEvent } from './../events/add-executions-context.event';

@Injectable()
export class CreateExecutionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IExecutionRepository
    ) {}

    public async main(
        executions: {
            id: ExecutionId,
            tenantId: ExecutionTenantId,
            tenantCode: ExecutionTenantCode,
            version: ExecutionVersion,
            systemId: ExecutionSystemId,
            systemName: ExecutionSystemName,
            type: ExecutionType,
            monitoringStartAt: ExecutionMonitoringStartAt,
            monitoringEndAt: ExecutionMonitoringEndAt,
            executedAt: ExecutionExecutedAt,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateExecutions = executions.map(execution => BplusItSappiExecution.register(
            execution.id,
            execution.tenantId,
            execution.tenantCode,
            execution.version,
            execution.systemId,
            execution.systemName,
            execution.type,
            execution.monitoringStartAt,
            execution.monitoringEndAt,
            execution.executedAt,
            new ExecutionCreatedAt(Utils.nowTimestamp()),
            new ExecutionUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateExecutions);

        // create AddExecutionsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const executionsRegistered = this.publisher.mergeObjectContext(new AddExecutionsContextEvent(aggregateExecutions));
 
        executionsRegistered.created(); // apply event to model events
        executionsRegistered.commit(); // commit all events of model
    }
}