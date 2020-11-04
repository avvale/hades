import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateChannelCommand } from './update-channel.command';
import { UpdateChannelService } from './update-channel.service';
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

@CommandHandler(UpdateChannelCommand)
export class UpdateChannelCommandHandler implements ICommandHandler<UpdateChannelCommand>
{
    constructor(
        private readonly updateChannelService: UpdateChannelService,
    ) {}

    async execute(command: UpdateChannelCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateChannelService.main(
            {
                id: new ChannelId(command.payload.id),
                hash: new ChannelHash(command.payload.hash, { undefinable: true }),
                tenantId: new ChannelTenantId(command.payload.tenantId, { undefinable: true }),
                tenantCode: new ChannelTenantCode(command.payload.tenantCode, { undefinable: true }),
                systemId: new ChannelSystemId(command.payload.systemId, { undefinable: true }),
                systemName: new ChannelSystemName(command.payload.systemName, { undefinable: true }),
                party: new ChannelParty(command.payload.party),
                component: new ChannelComponent(command.payload.component, { undefinable: true }),
                name: new ChannelName(command.payload.name, { undefinable: true }),
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
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}