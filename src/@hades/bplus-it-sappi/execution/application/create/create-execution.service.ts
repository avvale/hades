import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
    
} from './../../domain/value-objects';
import { IExecutionRepository } from './../../domain/execution.repository';
import { BplusItSappiExecution } from './../../domain/execution.aggregate';

@Injectable()
export class CreateExecutionService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IExecutionRepository
    ) {}

    public async main(
        id: ExecutionId,
        tenantId: ExecutionTenantId,
        tenantCode: ExecutionTenantCode,
        systemId: ExecutionSystemId,
        systemName: ExecutionSystemName,
        type: ExecutionType,
        monitoringStartAt: ExecutionMonitoringStartAt,
        monitoringEndAt: ExecutionMonitoringEndAt,
        executedAt: ExecutionExecutedAt,
        
    ): Promise<void>
    {
        // create object with factory pattern
        const execution = BplusItSappiExecution.register(
            id,
            tenantId,
            tenantCode,
            systemId,
            systemName,
            type,
            monitoringStartAt,
            monitoringEndAt,
            executedAt,
            new ExecutionCreatedAt(Utils.nowTimestamp()),
            new ExecutionUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(execution);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const executionRegister = this.publisher.mergeObjectContext(
            execution
        );
        
        executionRegister.created(execution); // apply event to model events
        executionRegister.commit(); // commit all events of model
    }
}