import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateChannelDetailController } from './create-channel-detail.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsDetail } from '@hades/bplus-it-sappi/channel-detail/infrastructure/seeds/channel-detail.seed';

describe('CreateChannelDetailController', () => 
{
    let controller: CreateChannelDetailController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CreateChannelDetailController
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

        controller  = module.get<CreateChannelDetailController>(CreateChannelDetailController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('CreateChannelDetailController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateChannelDetailController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an channelDetail created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsDetail[0])));
            expect(await controller.main(channelsDetail[0])).toBe(channelsDetail[0]);
        });
    });
});