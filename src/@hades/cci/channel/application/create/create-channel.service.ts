import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
import { IChannelRepository } from './../../domain/channel.repository';
import { CciChannel } from './../../domain/channel.aggregate';

@Injectable()
export class CreateChannelService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelRepository,
    ) {}

    public async main(
        payload: {
            id: ChannelId,
            hash: ChannelHash,
            tenantId: ChannelTenantId,
            tenantCode: ChannelTenantCode,
            systemId: ChannelSystemId,
            systemName: ChannelSystemName,
            party: ChannelParty,
            component: ChannelComponent,
            name: ChannelName,
            flowHash: ChannelFlowHash,
            flowParty: ChannelFlowParty,
            flowReceiverParty: ChannelFlowReceiverParty,
            flowComponent: ChannelFlowComponent,
            flowReceiverComponent: ChannelFlowReceiverComponent,
            flowInterfaceName: ChannelFlowInterfaceName,
            flowInterfaceNamespace: ChannelFlowInterfaceNamespace,
            version: ChannelVersion,
            adapterType: ChannelAdapterType,
            direction: ChannelDirection,
            transportProtocol: ChannelTransportProtocol,
            messageProtocol: ChannelMessageProtocol,
            adapterEngineName: ChannelAdapterEngineName,
            url: ChannelUrl,
            username: ChannelUsername,
            remoteHost: ChannelRemoteHost,
            remotePort: ChannelRemotePort,
            directory: ChannelDirectory,
            fileSchema: ChannelFileSchema,
            proxyHost: ChannelProxyHost,
            proxyPort: ChannelProxyPort,
            destination: ChannelDestination,
            adapterStatus: ChannelAdapterStatus,
            softwareComponentName: ChannelSoftwareComponentName,
            responsibleUserAccountName: ChannelResponsibleUserAccountName,
            lastChangeUserAccount: ChannelLastChangeUserAccount,
            lastChangedAt: ChannelLastChangedAt,
            riInterfaceName: ChannelRiInterfaceName,
            riInterfaceNamespace: ChannelRiInterfaceNamespace,
        },
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const channel = CciChannel.register(
            payload.id,
            payload.hash,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.party,
            payload.component,
            payload.name,
            payload.flowHash,
            payload.flowParty,
            payload.flowReceiverParty,
            payload.flowComponent,
            payload.flowReceiverComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.version,
            payload.adapterType,
            payload.direction,
            payload.transportProtocol,
            payload.messageProtocol,
            payload.adapterEngineName,
            payload.url,
            payload.username,
            payload.remoteHost,
            payload.remotePort,
            payload.directory,
            payload.fileSchema,
            payload.proxyHost,
            payload.proxyPort,
            payload.destination,
            payload.adapterStatus,
            payload.softwareComponentName,
            payload.responsibleUserAccountName,
            payload.lastChangeUserAccount,
            payload.lastChangedAt,
            payload.riInterfaceName,
            payload.riInterfaceNamespace,
            new ChannelCreatedAt({currentTimestamp: true}),
            new ChannelUpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create(channel);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const channelRegister = this.publisher.mergeObjectContext(
            channel
        );

        channelRegister.created(channel); // apply event to model events
        channelRegister.commit(); // commit all events of model
    }
}