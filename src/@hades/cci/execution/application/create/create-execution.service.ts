import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
import { IExecutionRepository } from './../../domain/execution.repository';
import { CciExecution } from './../../domain/execution.aggregate';

@Injectable()
export class CreateExecutionService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IExecutionRepository,
    ) {}

    public async main(
        id: ExecutionId,
        tenantId: ExecutionTenantId,
        tenantCode: ExecutionTenantCode,
        systemId: ExecutionSystemId,
        systemName: ExecutionSystemName,
        version: ExecutionVersion,
        type: ExecutionType,
        executedAt: ExecutionExecutedAt,
        monitoringStartAt: ExecutionMonitoringStartAt,
        monitoringEndAt: ExecutionMonitoringEndAt,
        
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const execution = CciExecution.register(
            id,
            tenantId,
            tenantCode,
            systemId,
            systemName,
            version,
            type,
            executedAt,
            monitoringStartAt,
            monitoringEndAt,
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