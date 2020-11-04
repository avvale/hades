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
    ChannelRiInterfaceNamespace,
    ChannelCreatedAt,
    ChannelUpdatedAt,
    ChannelDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(CreateChannelCommand)
export class CreateChannelCommandHandler implements ICommandHandler<CreateChannelCommand>
{
    constructor(
        private readonly createChannelService: CreateChannelService,
    ) {}

    async execute(command: CreateChannelCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createChannelService.main(
            {
                id: new ChannelId(command.payload.id),
                hash: new ChannelHash(command.payload.hash),
                tenantId: new ChannelTenantId(command.payload.tenantId),
                tenantCode: new ChannelTenantCode(command.payload.tenantCode),
                systemId: new ChannelSystemId(command.payload.systemId),
                systemName: new ChannelSystemName(command.payload.systemName),
                party: new ChannelParty(command.payload.party),
                component: new ChannelComponent(command.payload.component),
                name: new ChannelName(command.payload.name),
                flowHash: new ChannelFlowHash(command.payload.flowHash),
                flowParty: new ChannelFlowParty(command.payload.flowParty),
                flowReceiverParty: new ChannelFlowReceiverParty(command.payload.flowReceiverParty),
                flowComponent: new ChannelFlowComponent(command.payload.flowComponent),
                flowReceiverComponent: new ChannelFlowReceiverComponent(command.payload.flowReceiverComponent),
                flowInterfaceName: new ChannelFlowInterfaceName(command.payload.flowInterfaceName),
                flowInterfaceNamespace: new ChannelFlowInterfaceNamespace(command.payload.flowInterfaceNamespace),
                version: new ChannelVersion(command.payload.version),
                adapterType: new ChannelAdapterType(command.payload.adapterType),
                direction: new ChannelDirection(command.payload.direction),
                transportProtocol: new ChannelTransportProtocol(command.payload.transportProtocol),
                messageProtocol: new ChannelMessageProtocol(command.payload.messageProtocol),
                adapterEngineName: new ChannelAdapterEngineName(command.payload.adapterEngineName),
                url: new ChannelUrl(command.payload.url),
                username: new ChannelUsername(command.payload.username),
                remoteHost: new ChannelRemoteHost(command.payload.remoteHost),
                remotePort: new ChannelRemotePort(command.payload.remotePort),
                directory: new ChannelDirectory(command.payload.directory),
                fileSchema: new ChannelFileSchema(command.payload.fileSchema),
                proxyHost: new ChannelProxyHost(command.payload.proxyHost),
                proxyPort: new ChannelProxyPort(command.payload.proxyPort),
                destination: new ChannelDestination(command.payload.destination),
                adapterStatus: new ChannelAdapterStatus(command.payload.adapterStatus),
                softwareComponentName: new ChannelSoftwareComponentName(command.payload.softwareComponentName),
                responsibleUserAccountName: new ChannelResponsibleUserAccountName(command.payload.responsibleUserAccountName),
                lastChangeUserAccount: new ChannelLastChangeUserAccount(command.payload.lastChangeUserAccount),
                lastChangedAt: new ChannelLastChangedAt(command.payload.lastChangedAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                riInterfaceName: new ChannelRiInterfaceName(command.payload.riInterfaceName),
                riInterfaceNamespace: new ChannelRiInterfaceNamespace(command.payload.riInterfaceNamespace),
            }
        );
    }
}