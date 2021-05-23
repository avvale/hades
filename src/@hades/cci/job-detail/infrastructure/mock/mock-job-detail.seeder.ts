import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    JobDetailId,
    JobDetailTenantId,
    JobDetailTenantCode,
    JobDetailSystemId,
    JobDetailSystemName,
    JobDetailExecutionId,
    JobDetailExecutionType,
    JobDetailExecutionExecutedAt,
    JobDetailExecutionMonitoringStartAt,
    JobDetailExecutionMonitoringEndAt,
    JobDetailStatus,
    JobDetailName,
    JobDetailReturnCode,
    JobDetailNode,
    JobDetailUser,
    JobDetailStartAt,
    JobDetailEndAt,
    JobDetailCreatedAt,
    JobDetailUpdatedAt,
    JobDetailDeletedAt,
} from './../../domain/value-objects';
import { CciJobDetail } from './../../domain/job-detail.aggregate';
import { jobsDetail } from './../seeds/job-detail.seed';

@Injectable()
export class MockJobDetailSeeder extends MockSeeder<CciJobDetail>
{
    public collectionSource: CciJobDetail[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let jobDetail of jobsDetail)
        {
            this.collectionSource.push(
                CciJobDetail.register(
                    new JobDetailId(jobDetail.id),
                    new JobDetailTenantId(jobDetail.tenantId),
                    new JobDetailTenantCode(jobDetail.tenantCode),
                    new JobDetailSystemId(jobDetail.systemId),
                    new JobDetailSystemName(jobDetail.systemName),
                    new JobDetailExecutionId(jobDetail.executionId),
                    new JobDetailExecutionType(jobDetail.executionType),
                    new JobDetailExecutionExecutedAt(jobDetail.executionExecutedAt),
                    new JobDetailExecutionMonitoringStartAt(jobDetail.executionMonitoringStartAt),
                    new JobDetailExecutionMonitoringEndAt(jobDetail.executionMonitoringEndAt),
                    new JobDetailStatus(jobDetail.status),
                    new JobDetailName(jobDetail.name),
                    new JobDetailReturnCode(jobDetail.returnCode),
                    new JobDetailNode(jobDetail.node),
                    new JobDetailUser(jobDetail.user),
                    new JobDetailStartAt(jobDetail.startAt),
                    new JobDetailEndAt(jobDetail.endAt),
                    new JobDetailCreatedAt({currentTimestamp: true}),
                    new JobDetailUpdatedAt({currentTimestamp: true}),
                    new JobDetailDeletedAt(null),
                )
            );
        }
    }
}