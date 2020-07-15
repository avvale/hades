import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertChannelsDetailController } from './insert-channels-detail.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsDetail } from '@hades/bplus-it-sappi/channel-detail/infrastructure/seeds/channel-detail.seed';

describe('InsertChannelsDetailController', () => 
{
    let controller: InsertChannelsDetailController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                InsertChannelsDetailController
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

        controller  = module.get<InsertChannelsDetailController>(InsertChannelsDetailController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertChannelsDetailController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertChannelsDetailController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an channelsDetail created', async () => 
        {
            expect(await controller.main(channelsDetail)).toBe(undefined);
        });
    });
});