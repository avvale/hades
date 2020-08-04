import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateChannelsDetailCommandHandler } from './create-channels-detail.command-handler';
import { channelsDetail } from '@hades/bplus-it-sappi/channel-detail/infrastructure/seeds/channel-detail.seed';
import { CreateChannelsDetailCommand } from './create-channels-detail.command';
import { CreateChannelsDetailService } from './create-channels-detail.service';

describe('CreateChannelsDetailCommandHandler', () => 
{
    let commandHandler: CreateChannelsDetailCommandHandler;
    let service: CreateChannelsDetailService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateChannelsDetailCommandHandler,
                {
                    provide: CreateChannelsDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateChannelsDetailCommandHandler>(CreateChannelsDetailCommandHandler);
        service         = module.get<CreateChannelsDetailService>(CreateChannelsDetailService);
    });

    describe('main', () => 
    {
        test('CreateChannelsDetailCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an channelDetail created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateChannelsDetailCommand(
                    channelsDetail
                
                )
            )).toBe(undefined);
        });
    });
});