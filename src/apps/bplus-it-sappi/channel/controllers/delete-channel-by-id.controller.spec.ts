import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteChannelByIdController } from './delete-channel-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channels } from '@hades/bplus-it-sappi/channel/infrastructure/seeds/channel.seed';

describe('DeleteChannelByIdController', () => 
{
    let controller: DeleteChannelByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteChannelByIdController
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

        controller  = module.get<DeleteChannelByIdController>(DeleteChannelByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteChannelByIdController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteChannelByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an channel deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channels[0])));
            expect(await controller.main(channels[0].id)).toBe(channels[0]);
        });
    });
});