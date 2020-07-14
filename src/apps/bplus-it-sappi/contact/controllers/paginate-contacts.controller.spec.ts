import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateContactsController } from './paginate-contacts.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { contacts } from '@hades/bplus-it-sappi/contact/infrastructure/seeds/contact.seed';

describe('PaginateContactsController', () => 
{
    let controller: PaginateContactsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                PaginateContactsController
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

        controller  = module.get<PaginateContactsController>(PaginateContactsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('PaginateContactsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('PaginateContactsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a contacts', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(contacts)));
            expect(await controller.main([], [])).toBe(contacts);
        });
    });
});