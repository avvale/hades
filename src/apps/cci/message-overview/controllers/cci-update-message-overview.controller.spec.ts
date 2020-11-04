import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciUpdateMessageOverviewController } from './cci-update-message-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';

describe('CciUpdateMessageOverviewController', () => 
{
    let controller: CciUpdateMessageOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciUpdateMessageOverviewController
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

        controller  = module.get<CciUpdateMessageOverviewController>(CciUpdateMessageOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciUpdateMessageOverviewController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a messageOverview created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesOverview[0])));
            expect(await controller.main(messagesOverview[0])).toBe(messagesOverview[0]);
        });
    });
});