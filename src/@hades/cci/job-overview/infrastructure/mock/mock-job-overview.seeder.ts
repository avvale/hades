import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    JobOverviewId,
    JobOverviewTenantId,
    JobOverviewTenantCode,
    JobOverviewSystemId,
    JobOverviewSystemName,
    JobOverviewExecutionId,
    JobOverviewExecutionType,
    JobOverviewExecutionExecutedAt,
    JobOverviewExecutionMonitoringStartAt,
    JobOverviewExecutionMonitoringEndAt,
    JobOverviewCancelled,
    JobOverviewCompleted,
    JobOverviewError,
    JobOverviewCreatedAt,
    JobOverviewUpdatedAt,
    JobOverviewDeletedAt,
} from './../../domain/value-objects';
import { CciJobOverview } from './../../domain/job-overview.aggregate';
import { jobsOverview } from './../seeds/job-overview.seed';

@Injectable()
export class MockJobOverviewSeeder extends MockSeeder<CciJobOverview>
{
    public collectionSource: CciJobOverview[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let jobOverview of jobsOverview)
        {
            this.collectionSource.push(
                CciJobOverview.register(
                    new JobOverviewId(jobOverview.id),
                    new JobOverviewTenantId(jobOverview.tenantId),
                    new JobOverviewTenantCode(jobOverview.tenantCode),
                    new JobOverviewSystemId(jobOverview.systemId),
                    new JobOverviewSystemName(jobOverview.systemName),
                    new JobOverviewExecutionId(jobOverview.executionId),
                    new JobOverviewExecutionType(jobOverview.executionType),
                    new JobOverviewExecutionExecutedAt(jobOverview.executionExecutedAt),
                    new JobOverviewExecutionMonitoringStartAt(jobOverview.executionMonitoringStartAt),
                    new JobOverviewExecutionMonitoringEndAt(jobOverview.executionMonitoringEndAt),
                    new JobOverviewCancelled(jobOverview.cancelled),
                    new JobOverviewCompleted(jobOverview.completed),
                    new JobOverviewError(jobOverview.error),
                    new JobOverviewCreatedAt({currentTimestamp: true}),
                    new JobOverviewUpdatedAt({currentTimestamp: true}),
                    new JobOverviewDeletedAt(null),
                )
            );
        }
    }
}