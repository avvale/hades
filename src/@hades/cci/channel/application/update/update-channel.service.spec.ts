import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { channels } from '@hades/cci/channel/infrastructure/seeds/channel.seed';
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
import { IChannelRepository } from './../../domain/channel.repository';
import { MockChannelRepository } from './../../infrastructure/mock/mock-channel.repository';

describe('UpdateChannelService', () =>
{
    let service: UpdateChannelService;
    let repository: IChannelRepository;
    let mockRepository: MockChannelRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateChannelService,
                MockChannelRepository,
                {
                    provide: IChannelRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateChannelService);
        repository      = module.get(IChannelRepository);
        mockRepository  = module.get(MockChannelRepository);
    });

    describe('main', () =>
    {
        test('UpdateChannelService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a channel and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new ChannelId(channels[0].id),
                    hash: new ChannelHash(channels[0].hash),
                    tenantId: new ChannelTenantId(channels[0].tenantId),
                    tenantCode: new ChannelTenantCode(channels[0].tenantCode),
                    systemId: new ChannelSystemId(channels[0].systemId),
                    systemName: new ChannelSystemName(channels[0].systemName),
                    party: new ChannelParty(channels[0].party),
                    component: new ChannelComponent(channels[0].component),
                    name: new ChannelName(channels[0].name),
                    flowHash: new ChannelFlowHash(channels[0].flowHash),
                    flowParty: new ChannelFlowParty(channels[0].flowParty),
                    flowReceiverParty: new ChannelFlowReceiverParty(channels[0].flowReceiverParty),
                    flowComponent: new ChannelFlowComponent(channels[0].flowComponent),
                    flowReceiverComponent: new ChannelFlowReceiverComponent(channels[0].flowReceiverComponent),
                    flowInterfaceName: new ChannelFlowInterfaceName(channels[0].flowInterfaceName),
                    flowInterfaceNamespace: new ChannelFlowInterfaceNamespace(channels[0].flowInterfaceNamespace),
                    version: new ChannelVersion(channels[0].version),
                    adapterType: new ChannelAdapterType(channels[0].adapterType),
                    direction: new ChannelDirection(channels[0].direction),
                    transportProtocol: new ChannelTransportProtocol(channels[0].transportProtocol),
                    messageProtocol: new ChannelMessageProtocol(channels[0].messageProtocol),
                    adapterEngineName: new ChannelAdapterEngineName(channels[0].adapterEngineName),
                    url: new ChannelUrl(channels[0].url),
                    username: new ChannelUsername(channels[0].username),
                    remoteHost: new ChannelRemoteHost(channels[0].remoteHost),
                    remotePort: new ChannelRemotePort(channels[0].remotePort),
                    directory: new ChannelDirectory(channels[0].directory),
                    fileSchema: new ChannelFileSchema(channels[0].fileSchema),
                    proxyHost: new ChannelProxyHost(channels[0].proxyHost),
                    proxyPort: new ChannelProxyPort(channels[0].proxyPort),
                    destination: new ChannelDestination(channels[0].destination),
                    adapterStatus: new ChannelAdapterStatus(channels[0].adapterStatus),
                    softwareComponentName: new ChannelSoftwareComponentName(channels[0].softwareComponentName),
                    responsibleUserAccountName: new ChannelResponsibleUserAccountName(channels[0].responsibleUserAccountName),
                    lastChangeUserAccount: new ChannelLastChangeUserAccount(channels[0].lastChangeUserAccount),
                    lastChangedAt: new ChannelLastChangedAt(channels[0].lastChangedAt),
                    riInterfaceName: new ChannelRiInterfaceName(channels[0].riInterfaceName),
                    riInterfaceNamespace: new ChannelRiInterfaceNamespace(channels[0].riInterfaceNamespace),
                }
            )).toBe(undefined);
        });
    });
});