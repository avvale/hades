import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiChannel } from './channel.aggregate';
import { ChannelResponse } from './channel.response';
import { 
    ChannelId, 
    ChannelTenantId, 
    ChannelSystemId, 
    ChannelParty, 
    ChannelComponent, 
    ChannelName, 
    ChannelFlowParty, 
    ChannelFlowComponent, 
    ChannelFlowInterfaceName, 
    ChannelFlowInterfaceNamespace, 
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
    ChannelCreatedAt, 
    ChannelUpdatedAt, 
    ChannelDeletedAt
    
} from './value-objects';

export class ChannelMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param channel
     */
    mapObjectToAggregate(channel: ObjectLiteral): BplusItSappiChannel
    {
        return this.makeAggregate(channel);
    }

    /**
     * Map array of objects to array aggregates
     * @param channels 
     */
    mapObjectsToAggregates(channels: ObjectLiteral[]): BplusItSappiChannel[]
    {
        return channels.map(channel  => this.makeAggregate(channel ));
    }

    /**
     * Map aggregate to response
     * @param channel 
     */
    mapAggregateToResponse(channel: BplusItSappiChannel): ChannelResponse
    {
        return this.makeResponse(channel);
    }

    /**
     * Map array of aggregates to array responses
     * @param channels
     */
    mapAggregatesToResponses(channels: BplusItSappiChannel[]): ChannelResponse[]
    {
        return channels.map(channel => this.makeResponse(channel));
    }

    private makeAggregate(channel: ObjectLiteral): BplusItSappiChannel
    {
        return BplusItSappiChannel.register(
            new ChannelId(channel.id),
            new ChannelTenantId(channel.tenantId),
            new ChannelSystemId(channel.systemId),
            new ChannelParty(channel.party),
            new ChannelComponent(channel.component),
            new ChannelName(channel.name),
            new ChannelFlowParty(channel.flowParty),
            new ChannelFlowComponent(channel.flowComponent),
            new ChannelFlowInterfaceName(channel.flowInterfaceName),
            new ChannelFlowInterfaceNamespace(channel.flowInterfaceNamespace),
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
            new ChannelLastChangedAt(channel.lastChangedAt),
            new ChannelCreatedAt(channel.createdAt),
            new ChannelUpdatedAt(channel.updatedAt),
            new ChannelDeletedAt(channel.deletedAt),
              
        );
    }

    private makeResponse(channel: BplusItSappiChannel): ChannelResponse
    {
        return new ChannelResponse(
            channel.id.value,
            channel.tenantId.value,
            channel.systemId.value,
            channel.party.value,
            channel.component.value,
            channel.name.value,
            channel.flowParty.value,
            channel.flowComponent.value,
            channel.flowInterfaceName.value,
            channel.flowInterfaceNamespace.value,
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
            channel.createdAt.value,
            channel.updatedAt.value,
            channel.deletedAt.value,
            
        );
    }
}