import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertChannelsOverviewController } from './insert-channels-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsOverview } from '@hades/bplus-it-sappi/channel-overview/infrastructure/seeds/channel-overview.seed';

describe('InsertChannelsOverviewController', () => 
{
    let controller: InsertChannelsOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                InsertChannelsOverviewController
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

        controller  = module.get<InsertChannelsOverviewController>(InsertChannelsOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertChannelsOverviewController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertChannelsOverviewController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an channelsOverview created', async () => 
        {
            expect(await controller.main(channelsOverview)).toBe(undefined);
        });
    });
});