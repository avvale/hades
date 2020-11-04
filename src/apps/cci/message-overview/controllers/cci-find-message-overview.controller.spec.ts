import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindMessageOverviewController } from './cci-find-message-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';

describe('CciFindMessageOverviewController', () => 
{
    let controller: CciFindMessageOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciFindMessageOverviewController
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

        controller  = module.get<CciFindMessageOverviewController>(CciFindMessageOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciFindMessageOverviewController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a messageOverview', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesOverview[0])));
            expect(await controller.main()).toBe(messagesOverview[0]);
        });
    });
});