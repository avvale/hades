import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertMessagesDetailController } from './insert-messages-detail.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesDetail } from '@hades/bplus-it-sappi/message-detail/infrastructure/seeds/message-detail.seed';

describe('InsertMessagesDetailController', () => 
{
    let controller: InsertMessagesDetailController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                InsertMessagesDetailController
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

        controller  = module.get<InsertMessagesDetailController>(InsertMessagesDetailController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertMessagesDetailController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertMessagesDetailController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an messagesDetail created', async () => 
        {
            expect(await controller.main(messagesDetail)).toBe(undefined);
        });
    });
});