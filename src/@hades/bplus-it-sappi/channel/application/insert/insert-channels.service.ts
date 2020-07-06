import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
import { IChannelRepository } from './../../domain/channel.repository';
import { BplusItSappiChannel } from './../../domain/channel.aggregate';

@Injectable()
export class InsertChannelsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelRepository
    ) {}

    public async main(
        channels: {
            id: ChannelId,
            tenantId: ChannelTenantId,
            systemId: ChannelSystemId,
            party: ChannelParty,
            component: ChannelComponent,
            name: ChannelName,
            flowParty: ChannelFlowParty,
            flowComponent: ChannelFlowComponent,
            flowInterfaceName: ChannelFlowInterfaceName,
            flowInterfaceNamespace: ChannelFlowInterfaceNamespace,
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
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateChannels = channels.map(channel => BplusItSappiChannel.register(
            channel.id,
            channel.tenantId,
            channel.systemId,
            channel.party,
            channel.component,
            channel.name,
            channel.flowParty,
            channel.flowComponent,
            channel.flowInterfaceName,
            channel.flowInterfaceNamespace,
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
            new ChannelCreatedAt(Utils.nowTimestamp()),
            new ChannelUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateChannels);

        // TODO a falta de definir eventos
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        // const channelsRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id)
        // );
        // 
        // channelsRegistered.created(channels); // apply event to model events
        // channelsRegistered.commit(); // commit all events of model
    }
}