import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IMessageOverviewRepository } from '@hades/cci/message-overview/domain/message-overview.repository';
import {
    MessageOverviewId,
    MessageOverviewTenantId,
    MessageOverviewTenantCode,
    MessageOverviewSystemId,
    MessageOverviewSystemName,
    MessageOverviewExecutionId,
    MessageOverviewExecutionType,
    MessageOverviewExecutionExecutedAt,
    MessageOverviewExecutionMonitoringStartAt,
    MessageOverviewExecutionMonitoringEndAt,
    MessageOverviewNumberMax,
    MessageOverviewNumberDays,
    MessageOverviewSuccess,
    MessageOverviewCancelled,
    MessageOverviewDelivering,
    MessageOverviewError,
    MessageOverviewHolding,
    MessageOverviewToBeDelivered,
    MessageOverviewWaiting,
    MessageOverviewCreatedAt,
    MessageOverviewUpdatedAt,
    MessageOverviewDeletedAt,
} from '@hades/cci/message-overview/domain/value-objects';
import { CciMessageOverview } from './../../domain/message-overview.aggregate';
import { messagesOverview } from './../seeds/message-overview.seed';

@Injectable()
export class MockMessageOverviewRepository extends MockRepository<CciMessageOverview> implements IMessageOverviewRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CciMessageOverview';
    public collectionSource: CciMessageOverview[];
    public deletedAtInstance: MessageOverviewDeletedAt = new MessageOverviewDeletedAt(null);

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

        for (const itemCollection of <any[]>messagesOverview)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CciMessageOverview.register(
                    new MessageOverviewId(itemCollection.id),
                    new MessageOverviewTenantId(itemCollection.tenantId),
                    new MessageOverviewTenantCode(itemCollection.tenantCode),
                    new MessageOverviewSystemId(itemCollection.systemId),
                    new MessageOverviewSystemName(itemCollection.systemName),
                    new MessageOverviewExecutionId(itemCollection.executionId),
                    new MessageOverviewExecutionType(itemCollection.executionType),
                    new MessageOverviewExecutionExecutedAt(itemCollection.executionExecutedAt),
                    new MessageOverviewExecutionMonitoringStartAt(itemCollection.executionMonitoringStartAt),
                    new MessageOverviewExecutionMonitoringEndAt(itemCollection.executionMonitoringEndAt),
                    new MessageOverviewNumberMax(itemCollection.numberMax),
                    new MessageOverviewNumberDays(itemCollection.numberDays),
                    new MessageOverviewSuccess(itemCollection.success),
                    new MessageOverviewCancelled(itemCollection.cancelled),
                    new MessageOverviewDelivering(itemCollection.delivering),
                    new MessageOverviewError(itemCollection.error),
                    new MessageOverviewHolding(itemCollection.holding),
                    new MessageOverviewToBeDelivered(itemCollection.toBeDelivered),
                    new MessageOverviewWaiting(itemCollection.waiting),
                    new MessageOverviewCreatedAt(itemCollection.createdAt),
                    new MessageOverviewUpdatedAt(itemCollection.updatedAt),
                    new MessageOverviewDeletedAt(itemCollection.deletedAt),
                ));
        }
    }

    async getDashboardData(tenantIds: string[], systemIds: string[]): Promise<CciMessageOverview[]>
    {
        return;
    }
}