import { AggregateRoot } from '@nestjs/cqrs';
import { CciExecution } from './../../domain/execution.aggregate';
import { CreatedExecutionEvent } from './created-execution.event';
import { DeletedExecutionEvent } from './deleted-execution.event';
import { CreatedExecutionsEvent } from './created-executions.event';
import { DeletedExecutionsEvent } from './deleted-executions.event';

export class AddExecutionsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: CciExecution[] = []
    ) {
        super();
    }

    *[Symbol.iterator]()
    { 
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot; 
    }

    created()
    {
        this.apply(
            new CreatedExecutionsEvent(
                this.aggregateRoots.map(execution => 
                    new CreatedExecutionEvent(
                        execution.id.value,
                        execution.tenantId.value,
                        execution.tenantCode.value,
                        execution.systemId.value,
                        execution.systemName.value,
                        execution.version.value,
                        execution.type.value,
                        execution.executedAt.value,
                        execution.monitoringStartAt.value,
                        execution.monitoringEndAt.value,
                        execution.createdAt?.value,
                        execution.updatedAt?.value,
                        execution.deletedAt?.value,
                        
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedExecutionsEvent(
                this.aggregateRoots.map(execution => 
                    new DeletedExecutionEvent(
                        execution.id.value,
                        execution.tenantId.value,
                        execution.tenantCode.value,
                        execution.systemId.value,
                        execution.systemName.value,
                        execution.version.value,
                        execution.type.value,
                        execution.executedAt.value,
                        execution.monitoringStartAt.value,
                        execution.monitoringEndAt.value,
                        execution.createdAt?.value,
                        execution.updatedAt?.value,
                        execution.deletedAt?.value,
                           
                    )
                )
            )
        );
    }   
}