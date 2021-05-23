// ignored file
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
import { AddChannelsContextEvent } from './../events/add-channels-context.event';

@Injectable()
export class CreateChannelsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelRepository,
    ) {}

    public async main(
        channels: {
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
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateChannels = channels.map(channel => CciChannel.register(
            channel.id,
            channel.hash,
            channel.tenantId,
            channel.tenantCode,
            channel.systemId,
            channel.systemName,
            channel.party,
            channel.component,
            channel.name,
            channel.flowHash,
            channel.flowParty,
            channel.flowReceiverParty,
            channel.flowComponent,
            channel.flowReceiverComponent,
            channel.flowInterfaceName,
            channel.flowInterfaceNamespace,
            channel.version,
            channel.adapterType,
            channel.direction,
            channel.transportProtocol,
            channel.messageProtocol,
            channel.adapterEngineName,
            channel.url,
            channel.username,
            channel.remoteHost,
            channel.remotePort,
            channel.directory,
            channel.fileSchema,
            channel.proxyHost,
            channel.proxyPort,
            channel.destination,
            channel.adapterStatus,
            channel.softwareComponentName,
            channel.responsibleUserAccountName,
            channel.lastChangeUserAccount,
            channel.lastChangedAt,
            channel.riInterfaceName,
            channel.riInterfaceNamespace,
            new ChannelCreatedAt({currentTimestamp: true}),
            new ChannelUpdatedAt({currentTimestamp: true}),
            null
        ));

        // insert
        await this.repository.insert(aggregateChannels, { updateOnDuplicate: [
                'flowHash',
                'flowParty',
                'flowComponent',
                'flowInterfaceName',
                'flowInterfaceNamespace',
                'version',
                'adapterType',
                'direction',
                'transportProtocol',
                'messageProtocol',
                'adapterEngineName',
                'url',
                'username',
                'remoteHost',
                'remotePort',
                'directory',
                'fileSchema',
                'proxyHost',
                'proxyPort',
                'destination',
                'adapterStatus',
                'softwareComponentName',
                'responsibleUserAccountName',
                'lastChangeUserAccount',
                'lastChangedAt',
                'riInterfaceName',
                'riInterfaceNamespace',
                'updatedAt'
            ]
        });

        // create AddChannelsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const channelsRegistered = this.publisher.mergeObjectContext(new AddChannelsContextEvent(aggregateChannels));

        channelsRegistered.created(); // apply event to model events
        channelsRegistered.commit(); // commit all events of model
    }
}