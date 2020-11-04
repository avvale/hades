import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { CciChannel } from './channel.aggregate';
import { ChannelResponse } from './channel.response';
import {
    ChannelId,
    ChannelHash,
    ChannelTenantId,
    ChannelTenantCode,
    ChannelSystemId,
    ChannelSystemName,
    ChannelParty,
    ChannelComponent,
    ChannelName,
    ChannelFlowHash,
    ChannelFlowParty,
    ChannelFlowReceiverParty,
    ChannelFlowComponent,
    ChannelFlowReceiverComponent,
    ChannelFlowInterfaceName,
    ChannelFlowInterfaceNamespace,
    ChannelVersion,
    ChannelAdapterType,
    ChannelDirection,
    ChannelTransportProtocol,
    ChannelMessageProtocol,
    ChannelAdapterEngineName,
    ChannelUrl,
    ChannelUsername,
    ChannelRemoteHost,
    ChannelRemotePort,
    ChannelDirectory,
    ChannelFileSchema,
    ChannelProxyHost,
    ChannelProxyPort,
    ChannelDestination,
    ChannelAdapterStatus,
    ChannelSoftwareComponentName,
    ChannelResponsibleUserAccountName,
    ChannelLastChangeUserAccount,
    ChannelLastChangedAt,
    ChannelRiInterfaceName,
    ChannelRiInterfaceNamespace,
    ChannelCreatedAt,
    ChannelUpdatedAt,
    ChannelDeletedAt,
} from './value-objects';
import { TenantMapper } from '@hades/iam/tenant/domain/tenant.mapper';
import { SystemMapper } from '@hades/cci/system/domain/system.mapper';

export class ChannelMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param channel
     */
    mapModelToAggregate(channel: ObjectLiteral, cQMetadata?: CQMetadata): CciChannel
    {
        if (!channel) return;

        return this.makeAggregate(channel, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param channels
     */
    mapModelsToAggregates(channels: ObjectLiteral[], cQMetadata?: CQMetadata): CciChannel[]
    {
        if (!Array.isArray(channels)) return;

        return channels.map(channel  => this.makeAggregate(channel, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param channel
     */
    mapAggregateToResponse(channel: CciChannel): ChannelResponse
    {
        return this.makeResponse(channel);
    }

    /**
     * Map array of aggregates to array responses
     * @param channels
     */
    mapAggregatesToResponses(channels: CciChannel[]): ChannelResponse[]
    {
        if (!Array.isArray(channels)) return;

        return channels.map(channel => this.makeResponse(channel));
    }

    private makeAggregate(channel: ObjectLiteral, cQMetadata?: CQMetadata): CciChannel
    {
        return CciChannel.register(
            new ChannelId(channel.id),
            new ChannelHash(channel.hash),
            new ChannelTenantId(channel.tenantId),
            new ChannelTenantCode(channel.tenantCode),
            new ChannelSystemId(channel.systemId),
            new ChannelSystemName(channel.systemName),
            new ChannelParty(channel.party),
            new ChannelComponent(channel.component),
            new ChannelName(channel.name),
            new ChannelFlowHash(channel.flowHash),
            new ChannelFlowParty(channel.flowParty),
            new ChannelFlowReceiverParty(channel.flowReceiverParty),
            new ChannelFlowComponent(channel.flowComponent),
            new ChannelFlowReceiverComponent(channel.flowReceiverComponent),
            new ChannelFlowInterfaceName(channel.flowInterfaceName),
            new ChannelFlowInterfaceNamespace(channel.flowInterfaceNamespace),
            new ChannelVersion(channel.version),
            new ChannelAdapterType(channel.adapterType),
            new ChannelDirection(channel.direction),
            new ChannelTransportProtocol(channel.transportProtocol),
            new ChannelMessageProtocol(channel.messageProtocol),
            new ChannelAdapterEngineName(channel.adapterEngineName),
            new ChannelUrl(channel.url),
            new ChannelUsername(channel.username),
            new ChannelRemoteHost(channel.remoteHost),
            new ChannelRemotePort(channel.remotePort),
            new ChannelDirectory(channel.directory),
            new ChannelFileSchema(channel.fileSchema),
            new ChannelProxyHost(channel.proxyHost),
            new ChannelProxyPort(channel.proxyPort),
            new ChannelDestination(channel.destination),
            new ChannelAdapterStatus(channel.adapterStatus),
            new ChannelSoftwareComponentName(channel.softwareComponentName),
            new ChannelResponsibleUserAccountName(channel.responsibleUserAccountName),
            new ChannelLastChangeUserAccount(channel.lastChangeUserAccount),
            new ChannelLastChangedAt(channel.lastChangedAt, {}, {addTimezone: cQMetadata.timezone}),
            new ChannelRiInterfaceName(channel.riInterfaceName),
            new ChannelRiInterfaceNamespace(channel.riInterfaceNamespace),
            new ChannelCreatedAt(channel.createdAt, {}, {addTimezone: cQMetadata.timezone}),
            new ChannelUpdatedAt(channel.updatedAt, {}, {addTimezone: cQMetadata.timezone}),
            new ChannelDeletedAt(channel.deletedAt, {}, {addTimezone: cQMetadata.timezone}),
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapModelToAggregate(channel.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapModelToAggregate(channel.system) : undefined,
        );
    }

    private makeResponse(channel: CciChannel): ChannelResponse
    {
        if (!channel) return;

        return new ChannelResponse(
            channel.id.value,
            channel.hash.value,
            channel.tenantId.value,
            channel.tenantCode.value,
            channel.systemId.value,
            channel.systemName.value,
            channel.party.value,
            channel.component.value,
            channel.name.value,
            channel.flowHash.value,
            channel.flowParty.value,
            channel.flowReceiverParty.value,
            channel.flowComponent.value,
            channel.flowReceiverComponent.value,
            channel.flowInterfaceName.value,
            channel.flowInterfaceNamespace.value,
            channel.version.value,
            channel.adapterType.value,
            channel.direction.value,
            channel.transportProtocol.value,
            channel.messageProtocol.value,
            channel.adapterEngineName.value,
            channel.url.value,
            channel.username.value,
            channel.remoteHost.value,
            channel.remotePort.value,
            channel.directory.value,
            channel.fileSchema.value,
            channel.proxyHost.value,
            channel.proxyPort.value,
            channel.destination.value,
            channel.adapterStatus.value,
            channel.softwareComponentName.value,
            channel.responsibleUserAccountName.value,
            channel.lastChangeUserAccount.value,
            channel.lastChangedAt.value,
            channel.riInterfaceName.value,
            channel.riInterfaceNamespace.value,
            channel.createdAt.value,
            channel.updatedAt.value,
            channel.deletedAt.value,
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapAggregateToResponse(channel.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapAggregateToResponse(channel.system) : undefined,
        );
    }
}