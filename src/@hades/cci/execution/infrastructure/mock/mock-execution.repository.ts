import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IExecutionRepository } from '@hades/cci/execution/domain/execution.repository';
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
} from '@hades/cci/execution/domain/value-objects';
import { CciExecution } from './../../domain/execution.aggregate';
import { executions } from './../seeds/execution.seed';

@Injectable()
export class MockExecutionRepository extends MockRepository<CciExecution> implements IExecutionRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CciExecution';
    public collectionSource: CciExecution[];
    public deletedAtInstance: ExecutionDeletedAt = new ExecutionDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset()
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>executions)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CciExecution.register(
                    new ExecutionId(itemCollection.id),
                    new ExecutionTenantId(itemCollection.tenantId),
                    new ExecutionTenantCode(itemCollection.tenantCode),
                    new ExecutionSystemId(itemCollection.systemId),
                    new ExecutionSystemName(itemCollection.systemName),
                    new ExecutionVersion(itemCollection.version),
                    new ExecutionType(itemCollection.type),
                    new ExecutionExecutedAt(itemCollection.executedAt),
                    new ExecutionMonitoringStartAt(itemCollection.monitoringStartAt),
                    new ExecutionMonitoringEndAt(itemCollection.monitoringEndAt),
                    new ExecutionCreatedAt(itemCollection.createdAt),
                    new ExecutionUpdatedAt(itemCollection.updatedAt),
                    new ExecutionDeletedAt(itemCollection.deletedAt),
                    
                ));
        }
    }
}