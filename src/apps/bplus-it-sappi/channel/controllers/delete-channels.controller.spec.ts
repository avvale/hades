import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteChannelsController } from './delete-channels.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channels } from '@hades/bplus-it-sappi/channel/infrastructure/seeds/channel.seed';

describe('DeleteChannelsController', () => 
{
    let controller: DeleteChannelsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteChannelsController
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

        controller  = module.get<DeleteChannelsController>(DeleteChannelsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteChannelsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteChannelsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an channels deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channels)));
            expect(await controller.main([])).toBe(channels);
        });
    });
});