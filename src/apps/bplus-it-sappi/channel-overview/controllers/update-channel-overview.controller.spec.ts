import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateChannelOverviewController } from './update-channel-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsOverview } from '@hades/bplus-it-sappi/channel-overview/infrastructure/seeds/channel-overview.seed'

describe('UpdateChannelOverviewController', () => 
{
    let controller: UpdateChannelOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                UpdateChannelOverviewController
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

        controller  = module.get<UpdateChannelOverviewController>(UpdateChannelOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateChannelOverviewController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateChannelOverviewController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a channelOverview created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsOverview[0])));
            expect(await controller.main(channelsOverview[0])).toBe(channelsOverview[0]);
        });
    });
});