import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciDeleteChannelByIdController } from './cci-delete-channel-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channels } from '@hades/cci/channel/infrastructure/seeds/channel.seed';

describe('CciDeleteChannelByIdController', () => 
{
    let controller: CciDeleteChannelByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciDeleteChannelByIdController
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

        controller  = module.get<CciDeleteChannelByIdController>(CciDeleteChannelByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciDeleteChannelByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an channel deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channels[0])));
            expect(await controller.main(channels[0].id)).toBe(channels[0]);
        });
    });
});