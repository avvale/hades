import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
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
import { CciChannel } from './../../domain/channel.aggregate';
import { channels } from './../seeds/channel.seed';

@Injectable()
export class MockChannelSeeder extends MockSeeder<CciChannel>
{
    public collectionSource: CciChannel[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let channel of channels)
        {
            this.collectionSource.push(
                CciChannel.register(
                    new ChannelId(channel.id),
                    new ChannelHash(channel.hash),
                    new ChannelTenantId(channel.tenantId),
                    new ChannelTenantCode(channel.tenantCode),
                    new ChannelSystemId(channel.systemId),
                    new ChannelSystemName(channel.systemName),
                    new ChannelParty(channel.party),
                    new ChannelComponent(channel.component),
                    new ChannelName(channel.name),
                    new ChannelFlowHash(channel.flowHash),
                    new ChannelFlowParty(channel.flowParty),
                    new ChannelFlowReceiverParty(channel.flowReceiverParty),
                    new ChannelFlowComponent(channel.flowComponent),
                    new ChannelFlowReceiverComponent(channel.flowReceiverComponent),
                    new ChannelFlowInterfaceName(channel.flowInterfaceName),
                    new ChannelFlowInterfaceNamespace(channel.flowInterfaceNamespace),
                    new ChannelVersion(channel.version),
                    new ChannelAdapterType(channel.adapterType),
                    new ChannelDirection(channel.direction),
                    new ChannelTransportProtocol(channel.transportProtocol),
                    new ChannelMessageProtocol(channel.messageProtocol),
                    new ChannelAdapterEngineName(channel.adapterEngineName),
                    new ChannelUrl(channel.url),
                    new ChannelUsername(channel.username),
                    new ChannelRemoteHost(channel.remoteHost),
                    new ChannelRemotePort(channel.remotePort),
                    new ChannelDirectory(channel.directory),
                    new ChannelFileSchema(channel.fileSchema),
                    new ChannelProxyHost(channel.proxyHost),
                    new ChannelProxyPort(channel.proxyPort),
                    new ChannelDestination(channel.destination),
                    new ChannelAdapterStatus(channel.adapterStatus),
                    new ChannelSoftwareComponentName(channel.softwareComponentName),
                    new ChannelResponsibleUserAccountName(channel.responsibleUserAccountName),
                    new ChannelLastChangeUserAccount(channel.lastChangeUserAccount),
                    new ChannelLastChangedAt(channel.lastChangedAt),
                    new ChannelRiInterfaceName(channel.riInterfaceName),
                    new ChannelRiInterfaceNamespace(channel.riInterfaceNamespace),
                    new ChannelCreatedAt({currentTimestamp: true}),
                    new ChannelUpdatedAt({currentTimestamp: true}),
                    new ChannelDeletedAt(null),
                )
            );
        }
    }
}