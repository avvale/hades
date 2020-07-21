import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChannelsCommand } from './create-channels.command';
import { CreateChannelsService } from './create-channels.service';
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
    ChannelLastChangedAt
    
} from './../../domain/value-objects';

@CommandHandler(CreateChannelsCommand)
export class CreateChannelsCommandHandler implements ICommandHandler<CreateChannelsCommand>
{
    constructor(
        private readonly createChannelsService: CreateChannelsService
    ) { }

    async execute(command: CreateChannelsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createChannelsService.main(
            command.channels
                .map(channel => { 
                    return {
                        id: new ChannelId(channel.id),
                        tenantId: new ChannelTenantId(channel.tenantId),
                        systemId: new ChannelSystemId(channel.systemId),
                        party: new ChannelParty(channel.party),
                        component: new ChannelComponent(channel.component),
                        name: new ChannelName(channel.name),
                        flowParty: new ChannelFlowParty(channel.flowParty),
                        flowComponent: new ChannelFlowComponent(channel.flowComponent),
                        flowInterfaceName: new ChannelFlowInterfaceName(channel.flowInterfaceName),
                        flowInterfaceNamespace: new ChannelFlowInterfaceNamespace(channel.flowInterfaceNamespace),
                        adapterType: new ChannelAdapterType(channel.adapterType),
                        direction: new ChannelDirection(channel.direction),
                        transportProtocol: new ChannelTransportProtocol(channel.transportProtocol),
                        messageProtocol: new ChannelMessageProtocol(channel.messageProtocol),
                        adapterEngineName: new ChannelAdapterEngineName(channel.adapterEngineName),
                        url: new ChannelUrl(channel.url),
                        username: new ChannelUsername(channel.username),
                        remoteHost: new ChannelRemoteHost(channel.remoteHost),
                        remotePort: new ChannelRemotePort(channel.remotePort),
                        directory: new ChannelDirectory(channel.directory),
                        fileSchema: new ChannelFileSchema(channel.fileSchema),
                        proxyHost: new ChannelProxyHost(channel.proxyHost),
                        proxyPort: new ChannelProxyPort(channel.proxyPort),
                        destination: new ChannelDestination(channel.destination),
                        adapterStatus: new ChannelAdapterStatus(channel.adapterStatus),
                        softwareComponentName: new ChannelSoftwareComponentName(channel.softwareComponentName),
                        responsibleUserAccountName: new ChannelResponsibleUserAccountName(channel.responsibleUserAccountName),
                        lastChangeUserAccount: new ChannelLastChangeUserAccount(channel.lastChangeUserAccount),
                        lastChangedAt: new ChannelLastChangedAt(channel.lastChangedAt),
                        
                    }
                })
        );
    }
}