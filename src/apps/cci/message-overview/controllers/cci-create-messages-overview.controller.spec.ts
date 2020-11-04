import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateMessagesOverviewController } from './cci-create-messages-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';

describe('CciCreateMessagesOverviewController', () => 
{
    let controller: CciCreateMessagesOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciCreateMessagesOverviewController
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

        controller  = module.get<CciCreateMessagesOverviewController>(CciCreateMessagesOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciCreateMessagesOverviewController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an messagesOverview created', async () => 
        {
            expect(await controller.main(messagesOverview)).toBe(undefined);
        });
    });
});