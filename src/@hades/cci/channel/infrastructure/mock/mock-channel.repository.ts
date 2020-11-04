import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IChannelRepository } from '@hades/cci/channel/domain/channel.repository';
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
} from '@hades/cci/channel/domain/value-objects';
import { CciChannel } from './../../domain/channel.aggregate';
import { channels } from './../seeds/channel.seed';

@Injectable()
export class MockChannelRepository extends MockRepository<CciChannel> implements IChannelRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CciChannel';
    public collectionSource: CciChannel[];
    public deletedAtInstance: ChannelDeletedAt = new ChannelDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset()
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>channels)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CciChannel.register(
                    new ChannelId(itemCollection.id),
                    new ChannelHash(itemCollection.hash),
                    new ChannelTenantId(itemCollection.tenantId),
                    new ChannelTenantCode(itemCollection.tenantCode),
                    new ChannelSystemId(itemCollection.systemId),
                    new ChannelSystemName(itemCollection.systemName),
                    new ChannelParty(itemCollection.party),
                    new ChannelComponent(itemCollection.component),
                    new ChannelName(itemCollection.name),
                    new ChannelFlowHash(itemCollection.flowHash),
                    new ChannelFlowParty(itemCollection.flowParty),
                    new ChannelFlowReceiverParty(itemCollection.flowReceiverParty),
                    new ChannelFlowComponent(itemCollection.flowComponent),
                    new ChannelFlowReceiverComponent(itemCollection.flowReceiverComponent),
                    new ChannelFlowInterfaceName(itemCollection.flowInterfaceName),
                    new ChannelFlowInterfaceNamespace(itemCollection.flowInterfaceNamespace),
                    new ChannelVersion(itemCollection.version),
                    new ChannelAdapterType(itemCollection.adapterType),
                    new ChannelDirection(itemCollection.direction),
                    new ChannelTransportProtocol(itemCollection.transportProtocol),
                    new ChannelMessageProtocol(itemCollection.messageProtocol),
                    new ChannelAdapterEngineName(itemCollection.adapterEngineName),
                    new ChannelUrl(itemCollection.url),
                    new ChannelUsername(itemCollection.username),
                    new ChannelRemoteHost(itemCollection.remoteHost),
                    new ChannelRemotePort(itemCollection.remotePort),
                    new ChannelDirectory(itemCollection.directory),
                    new ChannelFileSchema(itemCollection.fileSchema),
                    new ChannelProxyHost(itemCollection.proxyHost),
                    new ChannelProxyPort(itemCollection.proxyPort),
                    new ChannelDestination(itemCollection.destination),
                    new ChannelAdapterStatus(itemCollection.adapterStatus),
                    new ChannelSoftwareComponentName(itemCollection.softwareComponentName),
                    new ChannelResponsibleUserAccountName(itemCollection.responsibleUserAccountName),
                    new ChannelLastChangeUserAccount(itemCollection.lastChangeUserAccount),
                    new ChannelLastChangedAt(itemCollection.lastChangedAt),
                    new ChannelRiInterfaceName(itemCollection.riInterfaceName),
                    new ChannelRiInterfaceNamespace(itemCollection.riInterfaceNamespace),
                    new ChannelCreatedAt(itemCollection.createdAt),
                    new ChannelUpdatedAt(itemCollection.updatedAt),
                    new ChannelDeletedAt(itemCollection.deletedAt),
                ));
        }
    }
}