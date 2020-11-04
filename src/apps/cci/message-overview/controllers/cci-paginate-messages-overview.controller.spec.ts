import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciPaginateMessagesOverviewController } from './cci-paginate-messages-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';

describe('CciPaginateMessagesOverviewController', () => 
{
    let controller: CciPaginateMessagesOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciPaginateMessagesOverviewController
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

        controller  = module.get<CciPaginateMessagesOverviewController>(CciPaginateMessagesOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciPaginateMessagesOverviewController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a messagesOverview', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesOverview)));
            expect(await controller.main()).toBe(messagesOverview);
        });
    });
});