import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteChannelsOverviewController } from './delete-channels-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsOverview } from '@hades/bplus-it-sappi/channel-overview/infrastructure/seeds/channel-overview.seed';

describe('DeleteChannelsOverviewController', () => 
{
    let controller: DeleteChannelsOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteChannelsOverviewController
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

        controller  = module.get<DeleteChannelsOverviewController>(DeleteChannelsOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteChannelsOverviewController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteChannelsOverviewController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an channelsOverview deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsOverview)));
            expect(await controller.main([])).toBe(channelsOverview);
        });
    });
});