import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiChannel } from './../../domain/channel.aggregate';
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
    
} from './../../domain/value-objects';

export class SequelizeChannelMapper implements SequelizeMapper
{
    mapToAggregate(channel: ObjectLiteral | ObjectLiteral[]): BplusItSappiChannel | BplusItSappiChannel[]
    {
        if (Array.isArray(channel))
        {
            return channel.map(item => BplusItSappiChannel.register(
                    new ChannelId(item.id),
                    new ChannelTenantId(item.tenantId),
                    new ChannelSystemId(item.systemId),
                    new ChannelParty(item.party),
                    new ChannelComponent(item.component),
                    new ChannelName(item.name),
                    new ChannelFlowParty(item.flowParty),
                    new ChannelFlowComponent(item.flowComponent),
                    new ChannelFlowInterfaceName(item.flowInterfaceName),
                    new ChannelFlowInterfaceNamespace(item.flowInterfaceNamespace),
                    new ChannelAdapterType(item.adapterType),
                    new ChannelDirection(item.direction),
                    new ChannelTransportProtocol(item.transportProtocol),
                    new ChannelMessageProtocol(item.messageProtocol),
                    new ChannelAdapterEngineName(item.adapterEngineName),
                    new ChannelUrl(item.url),
                    new ChannelUsername(item.username),
                    new ChannelRemoteHost(item.remoteHost),
                    new ChannelRemotePort(item.remotePort),
                    new ChannelDirectory(item.directory),
                    new ChannelFileSchema(item.fileSchema),
                    new ChannelProxyHost(item.proxyHost),
                    new ChannelProxyPort(item.proxyPort),
                    new ChannelDestination(item.destination),
                    new ChannelAdapterStatus(item.adapterStatus),
                    new ChannelSoftwareComponentName(item.softwareComponentName),
                    new ChannelResponsibleUserAccountName(item.responsibleUserAccountName),
                    new ChannelLastChangeUserAccount(item.lastChangeUserAccount),
                    new ChannelLastChangedAt(item.lastChangedAt),
                    new ChannelCreatedAt(item.createdAt),
                    new ChannelUpdatedAt(item.updatedAt),
                    new ChannelDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
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
}