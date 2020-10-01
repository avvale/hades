import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
    ChannelDeletedAt
    
} from './../../domain/value-objects';
import { IChannelRepository } from './../../domain/channel.repository';
import { CciChannel } from './../../domain/channel.aggregate';

@Injectable()
export class UpdateChannelService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelRepository
    ) {}

    public async main(
        id: ChannelId,
        hash?: ChannelHash,
        tenantId?: ChannelTenantId,
        tenantCode?: ChannelTenantCode,
        systemId?: ChannelSystemId,
        systemName?: ChannelSystemName,
        party?: ChannelParty,
        component?: ChannelComponent,
        name?: ChannelName,
        flowHash?: ChannelFlowHash,
        flowParty?: ChannelFlowParty,
        flowReceiverParty?: ChannelFlowReceiverParty,
        flowComponent?: ChannelFlowComponent,
        flowReceiverComponent?: ChannelFlowReceiverComponent,
        flowInterfaceName?: ChannelFlowInterfaceName,
        flowInterfaceNamespace?: ChannelFlowInterfaceNamespace,
        version?: ChannelVersion,
        adapterType?: ChannelAdapterType,
        direction?: ChannelDirection,
        transportProtocol?: ChannelTransportProtocol,
        messageProtocol?: ChannelMessageProtocol,
        adapterEngineName?: ChannelAdapterEngineName,
        url?: ChannelUrl,
        username?: ChannelUsername,
        remoteHost?: ChannelRemoteHost,
        remotePort?: ChannelRemotePort,
        directory?: ChannelDirectory,
        fileSchema?: ChannelFileSchema,
        proxyHost?: ChannelProxyHost,
        proxyPort?: ChannelProxyPort,
        destination?: ChannelDestination,
        adapterStatus?: ChannelAdapterStatus,
        softwareComponentName?: ChannelSoftwareComponentName,
        responsibleUserAccountName?: ChannelResponsibleUserAccountName,
        lastChangeUserAccount?: ChannelLastChangeUserAccount,
        lastChangedAt?: ChannelLastChangedAt,
        riInterfaceName?: ChannelRiInterfaceName,
        riInterfaceNamespace?: ChannelRiInterfaceNamespace,
        
    ): Promise<void>
    {        
        // create aggregate with factory pattern
        const channel = CciChannel.register(
            id,
            hash,
            tenantId,
            tenantCode,
            systemId,
            systemName,
            party,
            component,
            name,
            flowHash,
            flowParty,
            flowReceiverParty,
            flowComponent,
            flowReceiverComponent,
            flowInterfaceName,
            flowInterfaceNamespace,
            version,
            adapterType,
            direction,
            transportProtocol,
            messageProtocol,
            adapterEngineName,
            url,
            username,
            remoteHost,
            remotePort,
            directory,
            fileSchema,
            proxyHost,
            proxyPort,
            destination,
            adapterStatus,
            softwareComponentName,
            responsibleUserAccountName,
            lastChangeUserAccount,
            lastChangedAt,
            riInterfaceName,
            riInterfaceNamespace,
            null,
            new ChannelUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(channel);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const channelRegister = this.publisher.mergeObjectContext(
            channel
        );
        
        channelRegister.updated(channel); // apply event to model events
        channelRegister.commit(); // commit all events of model
    }
}