import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindChannelByIdController } from './cci-find-channel-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channels } from '@hades/cci/channel/infrastructure/seeds/channel.seed';

describe('CciFindChannelByIdController', () =>
{
    let controller: CciFindChannelByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciFindChannelByIdController
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

        controller  = module.get<CciFindChannelByIdController>(CciFindChannelByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CciFindChannelByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an channel by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channels[0])));
            expect(await controller.main(channels[0].id)).toBe(channels[0]);
        });
    });
});