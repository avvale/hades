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
import { AddExecutionsContextEvent } from './../events/add-executions-context.event';

@Injectable()
export class CreateExecutionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IExecutionRepository,
    ) {}

    public async main(
        executions: {
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
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateExecutions = executions.map(execution => CciExecution.register(
            execution.id,
            execution.tenantId,
            execution.tenantCode,
            execution.systemId,
            execution.systemName,
            execution.version,
            execution.type,
            execution.executedAt,
            execution.monitoringStartAt,
            execution.monitoringEndAt,
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