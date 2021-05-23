import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    ChannelDetailId,
    ChannelDetailTenantId,
    ChannelDetailTenantCode,
    ChannelDetailSystemId,
    ChannelDetailSystemName,
    ChannelDetailExecutionId,
    ChannelDetailExecutionType,
    ChannelDetailExecutionExecutedAt,
    ChannelDetailExecutionMonitoringStartAt,
    ChannelDetailExecutionMonitoringEndAt,
    ChannelDetailStatus,
    ChannelDetailChannelHash,
    ChannelDetailChannelSapId,
    ChannelDetailChannelParty,
    ChannelDetailChannelComponent,
    ChannelDetailChannelName,
    ChannelDetailDetail,
    ChannelDetailCreatedAt,
    ChannelDetailUpdatedAt,
    ChannelDetailDeletedAt,
} from './../../domain/value-objects';
import { CciChannelDetail } from './../../domain/channel-detail.aggregate';
import { channelsDetail } from './../seeds/channel-detail.seed';

@Injectable()
export class MockChannelDetailSeeder extends MockSeeder<CciChannelDetail>
{
    public collectionSource: CciChannelDetail[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let channelDetail of channelsDetail)
        {
            this.collectionSource.push(
                CciChannelDetail.register(
                    new ChannelDetailId(channelDetail.id),
                    new ChannelDetailTenantId(channelDetail.tenantId),
                    new ChannelDetailTenantCode(channelDetail.tenantCode),
                    new ChannelDetailSystemId(channelDetail.systemId),
                    new ChannelDetailSystemName(channelDetail.systemName),
                    new ChannelDetailExecutionId(channelDetail.executionId),
                    new ChannelDetailExecutionType(channelDetail.executionType),
                    new ChannelDetailExecutionExecutedAt(channelDetail.executionExecutedAt),
                    new ChannelDetailExecutionMonitoringStartAt(channelDetail.executionMonitoringStartAt),
                    new ChannelDetailExecutionMonitoringEndAt(channelDetail.executionMonitoringEndAt),
                    new ChannelDetailStatus(channelDetail.status),
                    new ChannelDetailChannelHash(channelDetail.channelHash),
                    new ChannelDetailChannelSapId(channelDetail.channelSapId),
                    new ChannelDetailChannelParty(channelDetail.channelParty),
                    new ChannelDetailChannelComponent(channelDetail.channelComponent),
                    new ChannelDetailChannelName(channelDetail.channelName),
                    new ChannelDetailDetail(channelDetail.detail),
                    new ChannelDetailCreatedAt({currentTimestamp: true}),
                    new ChannelDetailUpdatedAt({currentTimestamp: true}),
                    new ChannelDetailDeletedAt(null),
                )
            );
        }
    }
}