import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChannelCommand } from './create-channel.command';
import { CreateChannelService } from './create-channel.service';
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
    ChannelRiInterfaceNamespace
    
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
            new ChannelHash(command.hash),
            new ChannelTenantId(command.tenantId),
            new ChannelTenantCode(command.tenantCode),
            new ChannelSystemId(command.systemId),
            new ChannelSystemName(command.systemName),
            new ChannelParty(command.party),
            new ChannelComponent(command.component),
            new ChannelName(command.name),
            new ChannelFlowHash(command.flowHash),
            new ChannelFlowParty(command.flowParty),
            new ChannelFlowReceiverParty(command.flowReceiverParty),
            new ChannelFlowComponent(command.flowComponent),
            new ChannelFlowReceiverComponent(command.flowReceiverComponent),
            new ChannelFlowInterfaceName(command.flowInterfaceName),
            new ChannelFlowInterfaceNamespace(command.flowInterfaceNamespace),
            new ChannelVersion(command.version),
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
            new ChannelRiInterfaceName(command.riInterfaceName),
            new ChannelRiInterfaceNamespace(command.riInterfaceNamespace),
        );
    }
}