import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateChannelsCommandHandler } from './create-channels.command-handler';
import { channels } from '@hades/cci/channel/infrastructure/seeds/channel.seed';
import { CreateChannelsCommand } from './create-channels.command';
import { CreateChannelsService } from './create-channels.service';

describe('CreateChannelsCommandHandler', () => 
{
    let commandHandler: CreateChannelsCommandHandler;
    let service: CreateChannelsService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateChannelsCommandHandler,
                {
                    provide: CreateChannelsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateChannelsCommandHandler>(CreateChannelsCommandHandler);
        service         = module.get<CreateChannelsService>(CreateChannelsService);
    });

    describe('main', () => 
    {
        test('CreateChannelsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an channel created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateChannelsCommand(
                    channels
                
                )
            )).toBe(undefined);
        });
    });
});