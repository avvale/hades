import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateChannelCommandHandler } from './create-channel.command-handler';
import { channels } from '@hades/admin/channel/infrastructure/seeds/channel.seed';
import { CreateChannelCommand } from './create-channel.command';
import { CreateChannelService } from './create-channel.service';

describe('CreateChannelCommandHandler', () => 
{
    let commandHandler: CreateChannelCommandHandler;
    let service: CreateChannelService;

    beforeEach(async () => 
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

    it('CreateChannelCommandHandler should be defined', () => 
    {
        expect(commandHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateChannelCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        it('should return an channel created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateChannelCommand(
                    channels[0].id,
                    channels[0].tenantId,
                    channels[0].systemId,
                    channels[0].party,
                    channels[0].component,
                    channels[0].name,
                    channels[0].flowParty,
                    channels[0].flowComponent,
                    channels[0].flowInterfaceName,
                    channels[0].flowInterfaceNamespace,
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