import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
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
import { CciExecution } from './../../domain/execution.aggregate';
import { executions } from './../seeds/execution.seed';

@Injectable()
export class MockExecutionSeeder extends MockSeeder<CciExecution>
{
    public collectionSource: CciExecution[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let execution of executions)
        {
            this.collectionSource.push(
                CciExecution.register(
                    new ExecutionId(execution.id),
                    new ExecutionTenantId(execution.tenantId),
                    new ExecutionTenantCode(execution.tenantCode),
                    new ExecutionSystemId(execution.systemId),
                    new ExecutionSystemName(execution.systemName),
                    new ExecutionVersion(execution.version),
                    new ExecutionType(execution.type),
                    new ExecutionExecutedAt(execution.executedAt),
                    new ExecutionMonitoringStartAt(execution.monitoringStartAt),
                    new ExecutionMonitoringEndAt(execution.monitoringEndAt),
                    new ExecutionCreatedAt({currentTimestamp: true}),
                    new ExecutionUpdatedAt({currentTimestamp: true}),
                    new ExecutionDeletedAt(null),
                )
            );
        }
    }
}