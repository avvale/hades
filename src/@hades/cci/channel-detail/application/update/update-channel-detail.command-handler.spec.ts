import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { channelsDetail } from '@hades/cci/channel-detail/infrastructure/seeds/channel-detail.seed';
import { UpdateChannelDetailCommandHandler } from './update-channel-detail.command-handler';
import { UpdateChannelDetailCommand } from './update-channel-detail.command';
import { UpdateChannelDetailService } from './update-channel-detail.service';

describe('UpdateChannelDetailCommandHandler', () =>
{
    let commandHandler: UpdateChannelDetailCommandHandler;
    let service: UpdateChannelDetailService;

    beforeAll(async () =>
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
                    {
                        id: channelsDetail[0].id,
                        tenantId: channelsDetail[0].tenantId,
                        tenantCode: channelsDetail[0].tenantCode,
                        systemId: channelsDetail[0].systemId,
                        systemName: channelsDetail[0].systemName,
                        executionId: channelsDetail[0].executionId,
                        executionType: channelsDetail[0].executionType,
                        executionExecutedAt: channelsDetail[0].executionExecutedAt,
                        executionMonitoringStartAt: channelsDetail[0].executionMonitoringStartAt,
                        executionMonitoringEndAt: channelsDetail[0].executionMonitoringEndAt,
                        status: channelsDetail[0].status,
                        channelHash: channelsDetail[0].channelHash,
                        channelSapId: channelsDetail[0].channelSapId,
                        channelParty: channelsDetail[0].channelParty,
                        channelComponent: channelsDetail[0].channelComponent,
                        channelName: channelsDetail[0].channelName,
                        detail: channelsDetail[0].detail,
                    }
                )
            )).toBe(undefined);
        });
    });
});