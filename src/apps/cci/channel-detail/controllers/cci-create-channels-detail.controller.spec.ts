import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateChannelsDetailController } from './cci-create-channels-detail.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsDetail } from '@hades/cci/channel-detail/infrastructure/seeds/channel-detail.seed';

describe('CciCreateChannelsDetailController', () => 
{
    let controller: CciCreateChannelsDetailController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciCreateChannelsDetailController
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

        controller  = module.get<CciCreateChannelsDetailController>(CciCreateChannelsDetailController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciCreateChannelsDetailController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an channelsDetail created', async () => 
        {
            expect(await controller.main(channelsDetail)).toBe(undefined);
        });
    });
});