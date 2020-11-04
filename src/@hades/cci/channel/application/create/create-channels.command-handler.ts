import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChannelsCommand } from './create-channels.command';
import { CreateChannelsService } from './create-channels.service';
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
} from './../../domain/value-objects';

@CommandHandler(CreateChannelsCommand)
export class CreateChannelsCommandHandler implements ICommandHandler<CreateChannelsCommand>
{
    constructor(
        private readonly createChannelsService: CreateChannelsService,
    ) {}

    async execute(command: CreateChannelsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createChannelsService.main(
            command.payload
                .map(channel => {
                    return {
                        id: new ChannelId(channel.id),
                        hash: new ChannelHash(channel.hash),
                        tenantId: new ChannelTenantId(channel.tenantId),
                        tenantCode: new ChannelTenantCode(channel.tenantCode),
                        systemId: new ChannelSystemId(channel.systemId),
                        systemName: new ChannelSystemName(channel.systemName),
                        party: new ChannelParty(channel.party),
                        component: new ChannelComponent(channel.component),
                        name: new ChannelName(channel.name),
                        flowHash: new ChannelFlowHash(channel.flowHash),
                        flowParty: new ChannelFlowParty(channel.flowParty),
                        flowReceiverParty: new ChannelFlowReceiverParty(channel.flowReceiverParty),
                        flowComponent: new ChannelFlowComponent(channel.flowComponent),
                        flowReceiverComponent: new ChannelFlowReceiverComponent(channel.flowReceiverComponent),
                        flowInterfaceName: new ChannelFlowInterfaceName(channel.flowInterfaceName),
                        flowInterfaceNamespace: new ChannelFlowInterfaceNamespace(channel.flowInterfaceNamespace),
                        version: new ChannelVersion(channel.version),
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
                        lastChangedAt: new ChannelLastChangedAt(channel.lastChangedAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                        riInterfaceName: new ChannelRiInterfaceName(channel.riInterfaceName),
                        riInterfaceNamespace: new ChannelRiInterfaceNamespace(channel.riInterfaceNamespace),
                    }
                })
        );
    }
}