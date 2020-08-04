import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateChannelCommandHandler } from './update-channel.command-handler';
import { channels } from '@hades/bplus-it-sappi/channel/infrastructure/seeds/channel.seed';
import { UpdateChannelCommand } from './update-channel.command';
import { UpdateChannelService } from './update-channel.service';

describe('UpdateChannelCommandHandler', () => 
{
    let commandHandler: UpdateChannelCommandHandler;
    let service: UpdateChannelService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateChannelCommandHandler,
                {
                    provide: UpdateChannelService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateChannelCommandHandler>(UpdateChannelCommandHandler);
        service         = module.get<UpdateChannelService>(UpdateChannelService);
    });

    describe('main', () => 
    {
        test('UpdateChannelCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an channel created', async () => 
        {
            expect(await commandHandler.execute(
                new UpdateChannelCommand(
                    channels[0].id,
                    channels[0].hash,
                    channels[0].tenantId,
                    channels[0].tenantCode,
                    channels[0].systemId,
                    channels[0].systemName,
                    channels[0].party,
                    channels[0].component,
                    channels[0].name,
                    channels[0].flowHash,
                    channels[0].flowParty,
                    channels[0].flowComponent,
                    channels[0].flowInterfaceName,
                    channels[0].flowInterfaceNamespace,
                    channels[0].version,
                    channels[0].adapterType,
                    channels[0].direction,
                    channels[0].transportProtocol,
                    channels[0].messageProtocol,
                    channels[0].adapterEngineName,
                    channels[0].url,
                    channels[0].username,
                    channels[0].remoteHost,
                    channels[0].remotePort,
                    channels[0].directory,
                    channels[0].fileSchema,
                    channels[0].proxyHost,
                    channels[0].proxyPort,
                    channels[0].destination,
                    channels[0].adapterStatus,
                    channels[0].softwareComponentName,
                    channels[0].responsibleUserAccountName,
                    channels[0].lastChangeUserAccount,
                    channels[0].lastChangedAt,
                    
                )
            )).toBe(undefined);
        });
    });
});