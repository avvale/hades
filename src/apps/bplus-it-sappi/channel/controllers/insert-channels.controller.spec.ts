import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertChannelsController } from './insert-channels.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channels } from '@hades/bplus-it-sappi/channel/infrastructure/seeds/channel.seed';

describe('InsertChannelsController', () => 
{
    let controller: InsertChannelsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                InsertChannelsController
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

        controller  = module.get<InsertChannelsController>(InsertChannelsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertChannelsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertChannelsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an channels created', async () => 
        {
            expect(await controller.main(channels)).toBe(undefined);
        });
    });
});