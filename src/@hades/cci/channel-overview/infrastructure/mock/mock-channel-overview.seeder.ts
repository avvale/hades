import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
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
} from './../../domain/value-objects';
import { CciChannelOverview } from './../../domain/channel-overview.aggregate';
import { channelsOverview } from './../seeds/channel-overview.seed';

@Injectable()
export class MockChannelOverviewSeeder extends MockSeeder<CciChannelOverview>
{
    public collectionSource: CciChannelOverview[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let channelOverview of channelsOverview)
        {
            this.collectionSource.push(
                CciChannelOverview.register(
                    new ChannelOverviewId(channelOverview.id),
                    new ChannelOverviewTenantId(channelOverview.tenantId),
                    new ChannelOverviewTenantCode(channelOverview.tenantCode),
                    new ChannelOverviewSystemId(channelOverview.systemId),
                    new ChannelOverviewSystemName(channelOverview.systemName),
                    new ChannelOverviewExecutionId(channelOverview.executionId),
                    new ChannelOverviewExecutionType(channelOverview.executionType),
                    new ChannelOverviewExecutionExecutedAt(channelOverview.executionExecutedAt),
                    new ChannelOverviewExecutionMonitoringStartAt(channelOverview.executionMonitoringStartAt),
                    new ChannelOverviewExecutionMonitoringEndAt(channelOverview.executionMonitoringEndAt),
                    new ChannelOverviewError(channelOverview.error),
                    new ChannelOverviewInactive(channelOverview.inactive),
                    new ChannelOverviewSuccessful(channelOverview.successful),
                    new ChannelOverviewStopped(channelOverview.stopped),
                    new ChannelOverviewUnknown(channelOverview.unknown),
                    new ChannelOverviewUnregistered(channelOverview.unregistered),
                    new ChannelOverviewCreatedAt({currentTimestamp: true}),
                    new ChannelOverviewUpdatedAt({currentTimestamp: true}),
                    new ChannelOverviewDeletedAt(null),
                )
            );
        }
    }
}