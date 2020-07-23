import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateChannelDetailCommandHandler } from './update-channel-detail.command-handler';
import { channelsDetail } from '@hades/bplus-it-sappi/channel-detail/infrastructure/seeds/channel-detail.seed';
import { UpdateChannelDetailCommand } from './update-channel-detail.command';
import { UpdateChannelDetailService } from './update-channel-detail.service';

describe('UpdateChannelDetailCommandHandler', () => 
{
    let commandHandler: UpdateChannelDetailCommandHandler;
    let service: UpdateChannelDetailService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateChannelDetailCommandHandler,
                {
                    provide: UpdateChannelDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateChannelDetailCommandHandler>(UpdateChannelDetailCommandHandler);
        service         = module.get<UpdateChannelDetailService>(UpdateChannelDetailService);
    });

    describe('main', () => 
    {
        test('UpdateChannelDetailCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an channelDetail created', async () => 
        {
            expect(await commandHandler.execute(
                new UpdateChannelDetailCommand(
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