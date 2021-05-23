import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindContactController } from './cci-find-contact.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { contacts } from '@hades/cci/contact/infrastructure/seeds/contact.seed';

describe('CciFindContactController', () =>
{
    let controller: CciFindContactController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciFindContactController
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

        controller  = module.get<CciFindContactController>(CciFindContactController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CciFindContactController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a contact', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(contacts[0])));
            expect(await controller.main()).toBe(contacts[0]);
        });
    });
});