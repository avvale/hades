import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
    ChannelOverviewDeletedAt
    
} from './../../domain/value-objects';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { CciChannelOverview } from './../../domain/channel-overview.aggregate';

@Injectable()
export class CreateChannelOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelOverviewRepository
    ) {}

    public async main(
        id: ChannelOverviewId,
        tenantId: ChannelOverviewTenantId,
        tenantCode: ChannelOverviewTenantCode,
        systemId: ChannelOverviewSystemId,
        systemName: ChannelOverviewSystemName,
        executionId: ChannelOverviewExecutionId,
        executionType: ChannelOverviewExecutionType,
        executionExecutedAt: ChannelOverviewExecutionExecutedAt,
        executionMonitoringStartAt: ChannelOverviewExecutionMonitoringStartAt,
        executionMonitoringEndAt: ChannelOverviewExecutionMonitoringEndAt,
        error: ChannelOverviewError,
        inactive: ChannelOverviewInactive,
        successful: ChannelOverviewSuccessful,
        stopped: ChannelOverviewStopped,
        unknown: ChannelOverviewUnknown,
        unregistered: ChannelOverviewUnregistered,
        
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const channelOverview = CciChannelOverview.register(
            id,
            tenantId,
            tenantCode,
            systemId,
            systemName,
            executionId,
            executionType,
            executionExecutedAt,
            executionMonitoringStartAt,
            executionMonitoringEndAt,
            error,
            inactive,
            successful,
            stopped,
            unknown,
            unregistered,
            new ChannelOverviewCreatedAt(Utils.nowTimestamp()),
            new ChannelOverviewUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(channelOverview);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const channelOverviewRegister = this.publisher.mergeObjectContext(
            channelOverview
        );
        
        channelOverviewRegister.created(channelOverview); // apply event to model events
        channelOverviewRegister.commit(); // commit all events of model
    }
}