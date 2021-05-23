import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { channelsDetail } from '@hades/cci/channel-detail/infrastructure/seeds/channel-detail.seed';
import { CreateChannelDetailCommandHandler } from './create-channel-detail.command-handler';
import { CreateChannelDetailCommand } from './create-channel-detail.command';
import { CreateChannelDetailService } from './create-channel-detail.service';

describe('CreateChannelDetailCommandHandler', () =>
{
    let commandHandler: CreateChannelDetailCommandHandler;
    let service: CreateChannelDetailService;

    beforeAll(async () =>
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