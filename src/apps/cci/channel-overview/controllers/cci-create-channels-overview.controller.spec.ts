import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateChannelsOverviewController } from './cci-create-channels-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsOverview } from '@hades/cci/channel-overview/infrastructure/seeds/channel-overview.seed';

describe('CciCreateChannelsOverviewController', () =>
{
    let controller: CciCreateChannelsOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciCreateChannelsOverviewController
            ],
            providers: [
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {},
                    }
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {},
                    }
                },
            ]
        }).compile();

        controller  = module.get<CciCreateChannelsOverviewController>(CciCreateChannelsOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CciCreateChannelsOverviewController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an channelsOverview created', async () =>
        {
            expect(await controller.main(channelsOverview)).toBe(undefined);
        });
    });
});