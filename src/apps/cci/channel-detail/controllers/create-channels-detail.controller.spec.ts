import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateChannelsDetailController } from './create-channels-detail.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsDetail } from '@hades/cci/channel-detail/infrastructure/seeds/channel-detail.seed';

describe('CreateChannelsDetailController', () => 
{
    let controller: CreateChannelsDetailController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CreateChannelsDetailController
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

        controller  = module.get<CreateChannelsDetailController>(CreateChannelsDetailController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CreateChannelsDetailController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an channelsDetail created', async () => 
        {
            expect(await controller.main(channelsDetail)).toBe(undefined);
        });
    });
});