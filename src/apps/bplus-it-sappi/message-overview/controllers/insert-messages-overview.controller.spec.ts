import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertMessagesOverviewController } from './insert-messages-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/bplus-it-sappi/message-overview/infrastructure/seeds/message-overview.seed';

describe('InsertMessagesOverviewController', () => 
{
    let controller: InsertMessagesOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                InsertMessagesOverviewController
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

        controller  = module.get<InsertMessagesOverviewController>(InsertMessagesOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertMessagesOverviewController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertMessagesOverviewController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an messagesOverview created', async () => 
        {
            expect(await controller.main(messagesOverview)).toBe(undefined);
        });
    });
});