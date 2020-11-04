import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateChannelDetailCommand } from './update-channel-detail.command';
import { UpdateChannelDetailService } from './update-channel-detail.service';
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

@CommandHandler(UpdateChannelDetailCommand)
export class UpdateChannelDetailCommandHandler implements ICommandHandler<UpdateChannelDetailCommand>
{
    constructor(
        private readonly updateChannelDetailService: UpdateChannelDetailService,
    ) {}

    async execute(command: UpdateChannelDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateChannelDetailService.main(
            {
                id: new ChannelDetailId(command.payload.id),
                tenantId: new ChannelDetailTenantId(command.payload.tenantId, { undefinable: true }),
                tenantCode: new ChannelDetailTenantCode(command.payload.tenantCode, { undefinable: true }),
                systemId: new ChannelDetailSystemId(command.payload.systemId, { undefinable: true }),
                systemName: new ChannelDetailSystemName(command.payload.systemName, { undefinable: true }),
                executionId: new ChannelDetailExecutionId(command.payload.executionId, { undefinable: true }),
                executionType: new ChannelDetailExecutionType(command.payload.executionType, { undefinable: true }),
                executionExecutedAt: new ChannelDetailExecutionExecutedAt(command.payload.executionExecutedAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringStartAt: new ChannelDetailExecutionMonitoringStartAt(command.payload.executionMonitoringStartAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                executionMonitoringEndAt: new ChannelDetailExecutionMonitoringEndAt(command.payload.executionMonitoringEndAt, { undefinable: true }, {removeTimezone: command.cQMetadata.timezone}),
                status: new ChannelDetailStatus(command.payload.status, { undefinable: true }),
                channelHash: new ChannelDetailChannelHash(command.payload.channelHash, { undefinable: true }),
                channelSapId: new ChannelDetailChannelSapId(command.payload.channelSapId, { undefinable: true }),
                channelParty: new ChannelDetailChannelParty(command.payload.channelParty),
                channelComponent: new ChannelDetailChannelComponent(command.payload.channelComponent, { undefinable: true }),
                channelName: new ChannelDetailChannelName(command.payload.channelName, { undefinable: true }),
                detail: new ChannelDetailDetail(command.payload.detail),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}