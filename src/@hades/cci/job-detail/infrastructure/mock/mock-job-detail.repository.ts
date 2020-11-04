import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IJobDetailRepository } from '@hades/cci/job-detail/domain/job-detail.repository';
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
} from '@hades/cci/job-detail/domain/value-objects';
import { CciJobDetail } from './../../domain/job-detail.aggregate';
import { jobsDetail } from './../seeds/job-detail.seed';

@Injectable()
export class MockJobDetailRepository extends MockRepository<CciJobDetail> implements IJobDetailRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CciJobDetail';
    public collectionSource: CciJobDetail[];
    public deletedAtInstance: JobDetailDeletedAt = new JobDetailDeletedAt(null);

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

        for (const itemCollection of <any[]>jobsDetail)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CciJobDetail.register(
                    new JobDetailId(itemCollection.id),
                    new JobDetailTenantId(itemCollection.tenantId),
                    new JobDetailTenantCode(itemCollection.tenantCode),
                    new JobDetailSystemId(itemCollection.systemId),
                    new JobDetailSystemName(itemCollection.systemName),
                    new JobDetailExecutionId(itemCollection.executionId),
                    new JobDetailExecutionType(itemCollection.executionType),
                    new JobDetailExecutionExecutedAt(itemCollection.executionExecutedAt),
                    new JobDetailExecutionMonitoringStartAt(itemCollection.executionMonitoringStartAt),
                    new JobDetailExecutionMonitoringEndAt(itemCollection.executionMonitoringEndAt),
                    new JobDetailStatus(itemCollection.status),
                    new JobDetailName(itemCollection.name),
                    new JobDetailReturnCode(itemCollection.returnCode),
                    new JobDetailNode(itemCollection.node),
                    new JobDetailUser(itemCollection.user),
                    new JobDetailStartAt(itemCollection.startAt),
                    new JobDetailEndAt(itemCollection.endAt),
                    new JobDetailCreatedAt(itemCollection.createdAt),
                    new JobDetailUpdatedAt(itemCollection.updatedAt),
                    new JobDetailDeletedAt(itemCollection.deletedAt),
                ));
        }
    }
}