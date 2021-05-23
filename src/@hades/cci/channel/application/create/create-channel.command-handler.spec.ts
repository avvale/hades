import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { channels } from '@hades/cci/channel/infrastructure/seeds/channel.seed';
import { CreateChannelCommandHandler } from './create-channel.command-handler';
import { CreateChannelCommand } from './create-channel.command';
import { CreateChannelService } from './create-channel.service';

describe('CreateChannelCommandHandler', () =>
{
    let commandHandler: CreateChannelCommandHandler;
    let service: CreateChannelService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateChannelCommandHandler,
                {
                    provide: CreateChannelService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateChannelCommandHandler>(CreateChannelCommandHandler);
        service         = module.get<CreateChannelService>(CreateChannelService);
    });

    describe('main', () =>
    {
        test('CreateChannelCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateChannelService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateChannelCommand(
                    {
                        id: channels[0].id,
                        hash: channels[0].hash,
                        tenantId: channels[0].tenantId,
                        tenantCode: channels[0].tenantCode,
                        systemId: channels[0].systemId,
                        systemName: channels[0].systemName,
                        party: channels[0].party,
                        component: channels[0].component,
                        name: channels[0].name,
                        flowHash: channels[0].flowHash,
                        flowParty: channels[0].flowParty,
                        flowReceiverParty: channels[0].flowReceiverParty,
                        flowComponent: channels[0].flowComponent,
                        flowReceiverComponent: channels[0].flowReceiverComponent,
                        flowInterfaceName: channels[0].flowInterfaceName,
                        flowInterfaceNamespace: channels[0].flowInterfaceNamespace,
                        version: channels[0].version,
                        adapterType: channels[0].adapterType,
                        direction: channels[0].direction,
                        transportProtocol: channels[0].transportProtocol,
                        messageProtocol: channels[0].messageProtocol,
                        adapterEngineName: channels[0].adapterEngineName,
                        url: channels[0].url,
                        username: channels[0].username,
                        remoteHost: channels[0].remoteHost,
                        remotePort: channels[0].remotePort,
                        directory: channels[0].directory,
                        fileSchema: channels[0].fileSchema,
                        proxyHost: channels[0].proxyHost,
                        proxyPort: channels[0].proxyPort,
                        destination: channels[0].destination,
                        adapterStatus: channels[0].adapterStatus,
                        softwareComponentName: channels[0].softwareComponentName,
                        responsibleUserAccountName: channels[0].responsibleUserAccountName,
                        lastChangeUserAccount: channels[0].lastChangeUserAccount,
                        lastChangedAt: channels[0].lastChangedAt,
                        riInterfaceName: channels[0].riInterfaceName,
                        riInterfaceNamespace: channels[0].riInterfaceNamespace,
                    }
                )
            )).toBe(undefined);
        });
    });
});