import { AggregateRoot } from '@nestjs/cqrs';
import { CciChannel } from './../../domain/channel.aggregate';
import { CreatedChannelEvent } from './created-channel.event';
import { DeletedChannelEvent } from './deleted-channel.event';
import { CreatedChannelsEvent } from './created-channels.event';
import { DeletedChannelsEvent } from './deleted-channels.event';

export class AddChannelsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: CciChannel[] = []
    ) {
        super();
    }

    *[Symbol.iterator]()
    { 
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot; 
    }

    created()
    {
        this.apply(
            new CreatedChannelsEvent(
                this.aggregateRoots.map(channel => 
                    new CreatedChannelEvent(
                        channel.id.value,
                        channel.hash.value,
                        channel.tenantId.value,
                        channel.tenantCode.value,
                        channel.systemId.value,
                        channel.systemName.value,
                        channel.party?.value,
                        channel.component.value,
                        channel.name.value,
                        channel.flowHash?.value,
                        channel.flowParty?.value,
                        channel.flowReceiverParty?.value,
                        channel.flowComponent?.value,
                        channel.flowReceiverComponent?.value,
                        channel.flowInterfaceName?.value,
                        channel.flowInterfaceNamespace?.value,
                        channel.version?.value,
                        channel.adapterType?.value,
                        channel.direction?.value,
                        channel.transportProtocol?.value,
                        channel.messageProtocol?.value,
                        channel.adapterEngineName?.value,
                        channel.url?.value,
                        channel.username?.value,
                        channel.remoteHost?.value,
                        channel.remotePort?.value,
                        channel.directory?.value,
                        channel.fileSchema?.value,
                        channel.proxyHost?.value,
                        channel.proxyPort?.value,
                        channel.destination?.value,
                        channel.adapterStatus?.value,
                        channel.softwareComponentName?.value,
                        channel.responsibleUserAccountName?.value,
                        channel.lastChangeUserAccount?.value,
                        channel.lastChangedAt?.value,
                        channel.riInterfaceName?.value,
                        channel.riInterfaceNamespace?.value,
                        channel.createdAt?.value,
                        channel.updatedAt?.value,
                        channel.deletedAt?.value,
                        
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedChannelsEvent(
                this.aggregateRoots.map(channel => 
                    new DeletedChannelEvent(
                        channel.id.value,
                        channel.hash.value,
                        channel.tenantId.value,
                        channel.tenantCode.value,
                        channel.systemId.value,
                        channel.systemName.value,
                        channel.party?.value,
                        channel.component.value,
                        channel.name.value,
                        channel.flowHash?.value,
                        channel.flowParty?.value,
                        channel.flowReceiverParty?.value,
                        channel.flowComponent?.value,
                        channel.flowReceiverComponent?.value,
                        channel.flowInterfaceName?.value,
                        channel.flowInterfaceNamespace?.value,
                        channel.version?.value,
                        channel.adapterType?.value,
                        channel.direction?.value,
                        channel.transportProtocol?.value,
                        channel.messageProtocol?.value,
                        channel.adapterEngineName?.value,
                        channel.url?.value,
                        channel.username?.value,
                        channel.remoteHost?.value,
                        channel.remotePort?.value,
                        channel.directory?.value,
                        channel.fileSchema?.value,
                        channel.proxyHost?.value,
                        channel.proxyPort?.value,
                        channel.destination?.value,
                        channel.adapterStatus?.value,
                        channel.softwareComponentName?.value,
                        channel.responsibleUserAccountName?.value,
                        channel.lastChangeUserAccount?.value,
                        channel.lastChangedAt?.value,
                        channel.riInterfaceName?.value,
                        channel.riInterfaceNamespace?.value,
                        channel.createdAt?.value,
                        channel.updatedAt?.value,
                        channel.deletedAt?.value,
                           
                    )
                )
            )
        );
    }   
}