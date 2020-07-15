import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteMessagesDetailController } from './delete-messages-detail.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesDetail } from '@hades/bplus-it-sappi/message-detail/infrastructure/seeds/message-detail.seed';

describe('DeleteMessagesDetailController', () => 
{
    let controller: DeleteMessagesDetailController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteMessagesDetailController
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

        controller  = module.get<DeleteMessagesDetailController>(DeleteMessagesDetailController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteMessagesDetailController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteMessagesDetailController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an messagesDetail deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesDetail)));
            expect(await controller.main([])).toBe(messagesDetail);
        });
    });
});