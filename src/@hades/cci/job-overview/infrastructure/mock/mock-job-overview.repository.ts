import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IJobOverviewRepository } from '@hades/cci/job-overview/domain/job-overview.repository';
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
    JobOverviewDeletedAt
    
} from '@hades/cci/job-overview/domain/value-objects';
import { CciJobOverview } from './../../domain/job-overview.aggregate';
import { jobsOverview } from './../seeds/job-overview.seed';

@Injectable()
export class MockJobOverviewRepository extends MockRepository<CciJobOverview> implements IJobOverviewRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CciJobOverview';
    public collectionSource: CciJobOverview[];
    public deletedAtInstance: JobOverviewDeletedAt = new JobOverviewDeletedAt(null);
    
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

        for (const itemCollection of <any[]>jobsOverview)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(CciJobOverview.register(
                    new JobOverviewId(itemCollection.id),
                    new JobOverviewTenantId(itemCollection.tenantId),
                    new JobOverviewTenantCode(itemCollection.tenantCode),
                    new JobOverviewSystemId(itemCollection.systemId),
                    new JobOverviewSystemName(itemCollection.systemName),
                    new JobOverviewExecutionId(itemCollection.executionId),
                    new JobOverviewExecutionType(itemCollection.executionType),
                    new JobOverviewExecutionExecutedAt(itemCollection.executionExecutedAt),
                    new JobOverviewExecutionMonitoringStartAt(itemCollection.executionMonitoringStartAt),
                    new JobOverviewExecutionMonitoringEndAt(itemCollection.executionMonitoringEndAt),
                    new JobOverviewCancelled(itemCollection.cancelled),
                    new JobOverviewCompleted(itemCollection.completed),
                    new JobOverviewError(itemCollection.error),
                    new JobOverviewCreatedAt(itemCollection.createdAt),
                    new JobOverviewUpdatedAt(itemCollection.updatedAt),
                    new JobOverviewDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }
}