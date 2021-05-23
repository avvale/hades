// ignored file
import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IChannelOverviewRepository } from '@hades/cci/channel-overview/domain/channel-overview.repository';
import {
    ChannelOverviewId,
    ChannelOverviewTenantId,
    ChannelOverviewTenantCode,
    ChannelOverviewSystemId,
    ChannelOverviewSystemName,
    ChannelOverviewExecutionId,
    ChannelOverviewExecutionType,
    ChannelOverviewExecutionExecutedAt,
    ChannelOverviewExecutionMonitoringStartAt,
    ChannelOverviewExecutionMonitoringEndAt,
    ChannelOverviewError,
    ChannelOverviewInactive,
    ChannelOverviewSuccessful,
    ChannelOverviewStopped,
    ChannelOverviewUnknown,
    ChannelOverviewUnregistered,
    ChannelOverviewCreatedAt,
    ChannelOverviewUpdatedAt,
    ChannelOverviewDeletedAt,
} from '@hades/cci/channel-overview/domain/value-objects';
import { CciChannelOverview } from './../../domain/channel-overview.aggregate';
import { channelsOverview } from './../seeds/channel-overview.seed';

@Injectable()
export class MockChannelOverviewRepository extends MockRepository<CciChannelOverview> implements IChannelOverviewRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CciChannelOverview';
    public collectionSource: CciChannelOverview[];
    public deletedAtInstance: ChannelOverviewDeletedAt = new ChannelOverviewDeletedAt(null);

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

        for (const itemCollection of <any[]>channelsOverview)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CciChannelOverview.register(
                    new ChannelOverviewId(itemCollection.id),
                    new ChannelOverviewTenantId(itemCollection.tenantId),
                    new ChannelOverviewTenantCode(itemCollection.tenantCode),
                    new ChannelOverviewSystemId(itemCollection.systemId),
                    new ChannelOverviewSystemName(itemCollection.systemName),
                    new ChannelOverviewExecutionId(itemCollection.executionId),
                    new ChannelOverviewExecutionType(itemCollection.executionType),
                    new ChannelOverviewExecutionExecutedAt(itemCollection.executionExecutedAt),
                    new ChannelOverviewExecutionMonitoringStartAt(itemCollection.executionMonitoringStartAt),
                    new ChannelOverviewExecutionMonitoringEndAt(itemCollection.executionMonitoringEndAt),
                    new ChannelOverviewError(itemCollection.error),
                    new ChannelOverviewInactive(itemCollection.inactive),
                    new ChannelOverviewSuccessful(itemCollection.successful),
                    new ChannelOverviewStopped(itemCollection.stopped),
                    new ChannelOverviewUnknown(itemCollection.unknown),
                    new ChannelOverviewUnregistered(itemCollection.unregistered),
                    new ChannelOverviewCreatedAt(itemCollection.createdAt),
                    new ChannelOverviewUpdatedAt(itemCollection.updatedAt),
                    new ChannelOverviewDeletedAt(itemCollection.deletedAt),
                ));
        }
    }

    async getDashboardData(tenantIds: string[], systemIds: string[]): Promise<CciChannelOverview[]>
    {
        return;
    }
}