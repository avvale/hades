import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChannelCommand } from './create-channel.command';
import { CreateChannelService } from './create-channel.service';
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

@CommandHandler(CreateChannelCommand)
export class CreateChannelCommandHandler implements ICommandHandler<CreateChannelCommand>
{
    constructor(
        private readonly createChannelService: CreateChannelService
    ) { }

    async execute(command: CreateChannelCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createChannelService.main(
            new ChannelId(command.id),
            new ChannelTenantId(command.tenantId),
            new ChannelSystemId(command.systemId),
            new ChannelParty(command.party),
            new ChannelComponent(command.component),
            new ChannelName(command.name),
            new ChannelFlowParty(command.flowParty),
            new ChannelFlowComponent(command.flowComponent),
            new ChannelFlowInterfaceName(command.flowInterfaceName),
            new ChannelFlowInterfaceNamespace(command.flowInterfaceNamespace),
            new ChannelAdapterType(command.adapterType),
            new ChannelDirection(command.direction),
            new ChannelTransportProtocol(command.transportProtocol),
            new ChannelMessageProtocol(command.messageProtocol),
            new ChannelAdapterEngineName(command.adapterEngineName),
            new ChannelUrl(command.url),
            new ChannelUsername(command.username),
            new ChannelRemoteHost(command.remoteHost),
            new ChannelRemotePort(command.remotePort),
            new ChannelDirectory(command.directory),
            new ChannelFileSchema(command.fileSchema),
            new ChannelProxyHost(command.proxyHost),
            new ChannelProxyPort(command.proxyPort),
            new ChannelDestination(command.destination),
            new ChannelAdapterStatus(command.adapterStatus),
            new ChannelSoftwareComponentName(command.softwareComponentName),
            new ChannelResponsibleUserAccountName(command.responsibleUserAccountName),
            new ChannelLastChangeUserAccount(command.lastChangeUserAccount),
            new ChannelLastChangedAt(command.lastChangedAt),
            
        );
    }
}