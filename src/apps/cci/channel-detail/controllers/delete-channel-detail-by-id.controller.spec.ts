import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteChannelDetailByIdController } from './delete-channel-detail-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsDetail } from '@hades/cci/channel-detail/infrastructure/seeds/channel-detail.seed';

describe('DeleteChannelDetailByIdController', () => 
{
    let controller: DeleteChannelDetailByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteChannelDetailByIdController
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

        controller  = module.get<DeleteChannelDetailByIdController>(DeleteChannelDetailByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('DeleteChannelDetailByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an channelDetail deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsDetail[0])));
            expect(await controller.main(channelsDetail[0].id)).toBe(channelsDetail[0]);
        });
    });
});