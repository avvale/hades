import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateChannelsDetailController } from './paginate-channels-detail.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsDetail } from '@hades/cci/channel-detail/infrastructure/seeds/channel-detail.seed';

describe('PaginateChannelsDetailController', () => 
{
    let controller: PaginateChannelsDetailController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                PaginateChannelsDetailController
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

        controller  = module.get<PaginateChannelsDetailController>(PaginateChannelsDetailController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('PaginateChannelsDetailController should be defined', () => 
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