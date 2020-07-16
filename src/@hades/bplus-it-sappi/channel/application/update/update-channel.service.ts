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
export class UpdateChannelService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelRepository
    ) {}

    public async main(
        id: ChannelId,
        tenantId?: ChannelTenantId,
        systemId?: ChannelSystemId,
        party?: ChannelParty,
        component?: ChannelComponent,
        name?: ChannelName,
        flowParty?: ChannelFlowParty,
        flowComponent?: ChannelFlowComponent,
        flowInterfaceName?: ChannelFlowInterfaceName,
        flowInterfaceNamespace?: ChannelFlowInterfaceNamespace,
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
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const channel = BplusItSappiChannel.register(
            id,
            tenantId,
            systemId,
            party,
            component,
            name,
            flowParty,
            flowComponent,
            flowInterfaceName,
            flowInterfaceNamespace,
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