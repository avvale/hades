import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciDeleteContactsController } from './cci-delete-contacts.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { contacts } from '@hades/cci/contact/infrastructure/seeds/contact.seed';

describe('CciDeleteContactsController', () =>
{
    let controller: CciDeleteContactsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciDeleteContactsController
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

        controller  = module.get<CciDeleteContactsController>(CciDeleteContactsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CciDeleteContactsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an contacts deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(contacts)));
            expect(await controller.main()).toBe(contacts);
        });
    });
});