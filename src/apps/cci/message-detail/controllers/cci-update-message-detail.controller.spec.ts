import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciUpdateMessageDetailController } from './cci-update-message-detail.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesDetail } from '@hades/cci/message-detail/infrastructure/seeds/message-detail.seed';

describe('CciUpdateMessageDetailController', () => 
{
    let controller: CciUpdateMessageDetailController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciUpdateMessageDetailController
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

        controller  = module.get<CciUpdateMessageDetailController>(CciUpdateMessageDetailController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciUpdateMessageDetailController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a messageDetail created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesDetail[0])));
            expect(await controller.main(messagesDetail[0])).toBe(messagesDetail[0]);
        });
    });
});