import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateChannelDetailCommandHandler } from './create-channel-detail.command-handler';
import { channelsDetail } from '@hades/bplus-it-sappi/channel-detail/infrastructure/seeds/channel-detail.seed';
import { CreateChannelDetailCommand } from './create-channel-detail.command';
import { CreateChannelDetailService } from './create-channel-detail.service';

describe('CreateChannelDetailCommandHandler', () => 
{
    let commandHandler: CreateChannelDetailCommandHandler;
    let service: CreateChannelDetailService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateChannelDetailCommandHandler,
                {
                    provide: CreateChannelDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateChannelDetailCommandHandler>(CreateChannelDetailCommandHandler);
        service         = module.get<CreateChannelDetailService>(CreateChannelDetailService);
    });

    describe('main', () => 
    {
        test('CreateChannelDetailCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateChannelDetailService', async () => 
        {
            expect(await commandHandler.execute(
                new CreateChannelDetailCommand(
                    channelsDetail[0].id,
                    channelsDetail[0].tenantId,
                    channelsDetail[0].tenantCode,
                    channelsDetail[0].systemId,
                    channelsDetail[0].systemName,
                    channelsDetail[0].executionId,
                    channelsDetail[0].executionType,
                    channelsDetail[0].executionExecutedAt,
                    channelsDetail[0].executionMonitoringStartAt,
                    channelsDetail[0].executionMonitoringEndAt,
                    channelsDetail[0].status,
                    channelsDetail[0].channelId,
                    channelsDetail[0].channelSapId,
                    channelsDetail[0].channelParty,
                    channelsDetail[0].channelComponent,
                    channelsDetail[0].channelName,
                    channelsDetail[0].detail,
                    
                )
            )).toBe(undefined);
        });
    });
});