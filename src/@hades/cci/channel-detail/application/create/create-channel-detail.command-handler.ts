import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChannelDetailCommand } from './create-channel-detail.command';
import { CreateChannelDetailService } from './create-channel-detail.service';
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

@CommandHandler(CreateChannelDetailCommand)
export class CreateChannelDetailCommandHandler implements ICommandHandler<CreateChannelDetailCommand>
{
    constructor(
        private readonly createChannelDetailService: CreateChannelDetailService,
    ) {}

    async execute(command: CreateChannelDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createChannelDetailService.main(
            {
                id: new ChannelDetailId(command.payload.id),
                tenantId: new ChannelDetailTenantId(command.payload.tenantId),
                tenantCode: new ChannelDetailTenantCode(command.payload.tenantCode),
                systemId: new ChannelDetailSystemId(command.payload.systemId),
                systemName: new ChannelDetailSystemName(command.payload.systemName),
                executionId: new ChannelDetailExecutionId(command.payload.executionId),
                executionType: new ChannelDetailExecutionType(command.payload.executionType),
                executionExecutedAt: new ChannelDetailExecutionExecutedAt(command.payload.executionExecutedAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringStartAt: new ChannelDetailExecutionMonitoringStartAt(command.payload.executionMonitoringStartAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringEndAt: new ChannelDetailExecutionMonitoringEndAt(command.payload.executionMonitoringEndAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                status: new ChannelDetailStatus(command.payload.status),
                channelHash: new ChannelDetailChannelHash(command.payload.channelHash),
                channelSapId: new ChannelDetailChannelSapId(command.payload.channelSapId),
                channelParty: new ChannelDetailChannelParty(command.payload.channelParty),
                channelComponent: new ChannelDetailChannelComponent(command.payload.channelComponent),
                channelName: new ChannelDetailChannelName(command.payload.channelName),
                detail: new ChannelDetailDetail(command.payload.detail),
            }
        );
    }
}