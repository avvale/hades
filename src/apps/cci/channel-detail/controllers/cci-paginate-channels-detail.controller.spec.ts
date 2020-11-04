import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciPaginateChannelsDetailController } from './cci-paginate-channels-detail.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsDetail } from '@hades/cci/channel-detail/infrastructure/seeds/channel-detail.seed';

describe('CciPaginateChannelsDetailController', () => 
{
    let controller: CciPaginateChannelsDetailController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciPaginateChannelsDetailController
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

        controller  = module.get<CciPaginateChannelsDetailController>(CciPaginateChannelsDetailController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciPaginateChannelsDetailController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a channelsDetail', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsDetail)));
            expect(await controller.main()).toBe(channelsDetail);
        });
    });
});