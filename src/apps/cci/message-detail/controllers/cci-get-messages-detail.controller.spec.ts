import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciGetMessagesDetailController } from './cci-get-messages-detail.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesDetail } from '@hades/cci/message-detail/infrastructure/seeds/message-detail.seed';

describe('CciGetMessagesDetailController', () =>
{
    let controller: CciGetMessagesDetailController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciGetMessagesDetailController
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

        controller  = module.get<CciGetMessagesDetailController>(CciGetMessagesDetailController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CciGetMessagesDetailController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a messagesDetail', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesDetail)));
            expect(await controller.main()).toBe(messagesDetail);
        });
    });
});