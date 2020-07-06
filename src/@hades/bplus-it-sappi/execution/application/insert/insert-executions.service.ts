import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
import { IExecutionRepository } from './../../domain/execution.repository';
import { BplusItSappiExecution } from './../../domain/execution.aggregate';

@Injectable()
export class InsertExecutionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IExecutionRepository
    ) {}

    public async main(
        executions: {
            id: ExecutionId,
            tenantId: ExecutionTenantId,
            systemId: ExecutionSystemId,
            type: ExecutionType,
            monitoringStartAt: ExecutionMonitoringStartAt,
            monitoringEndAt: ExecutionMonitoringEndAt,
            executedAt: ExecutionExecutedAt,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const entityExecutions = executions.map(execution => BplusItSappiExecution.register(
            execution.id,
            execution.tenantId,
            execution.systemId,
            execution.type,
            execution.monitoringStartAt,
            execution.monitoringEndAt,
            execution.executedAt,
            new ExecutionCreatedAt(Utils.nowTimestamp()),
            new ExecutionUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(entityExecutions);

        // TODO a falta de definir eventos
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        // const executionsRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id)
        // );
        // 
        // executionsRegistered.created(executions); // apply event to model events
        // executionsRegistered.commit(); // commit all events of model
    }
}