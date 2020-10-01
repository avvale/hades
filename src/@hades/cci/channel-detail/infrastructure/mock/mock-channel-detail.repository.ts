import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IChannelDetailRepository } from '@hades/cci/channel-detail/domain/channel-detail.repository';
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
    ChannelDetailDeletedAt
    
} from '@hades/cci/channel-detail/domain/value-objects';
import { CciChannelDetail } from './../../domain/channel-detail.aggregate';
import { channelsDetail } from './../seeds/channel-detail.seed';

@Injectable()
export class MockChannelDetailRepository extends MockRepository<CciChannelDetail> implements IChannelDetailRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CciChannelDetail';
    public collectionSource: CciChannelDetail[];
    public deletedAtInstance: ChannelDetailDeletedAt = new ChannelDetailDeletedAt(null);
    
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

        for (const itemCollection of <any[]>channelsDetail)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(CciChannelDetail.register(
                    new ChannelDetailId(itemCollection.id),
                    new ChannelDetailTenantId(itemCollection.tenantId),
                    new ChannelDetailTenantCode(itemCollection.tenantCode),
                    new ChannelDetailSystemId(itemCollection.systemId),
                    new ChannelDetailSystemName(itemCollection.systemName),
                    new ChannelDetailExecutionId(itemCollection.executionId),
                    new ChannelDetailExecutionType(itemCollection.executionType),
                    new ChannelDetailExecutionExecutedAt(itemCollection.executionExecutedAt),
                    new ChannelDetailExecutionMonitoringStartAt(itemCollection.executionMonitoringStartAt),
                    new ChannelDetailExecutionMonitoringEndAt(itemCollection.executionMonitoringEndAt),
                    new ChannelDetailStatus(itemCollection.status),
                    new ChannelDetailChannelHash(itemCollection.channelHash),
                    new ChannelDetailChannelSapId(itemCollection.channelSapId),
                    new ChannelDetailChannelParty(itemCollection.channelParty),
                    new ChannelDetailChannelComponent(itemCollection.channelComponent),
                    new ChannelDetailChannelName(itemCollection.channelName),
                    new ChannelDetailDetail(itemCollection.detail),
                    new ChannelDetailCreatedAt(itemCollection.createdAt),
                    new ChannelDetailUpdatedAt(itemCollection.updatedAt),
                    new ChannelDetailDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }
}