import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateContactController } from './update-contact.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { contacts } from '@hades/bplus-it-sappi/contact/infrastructure/seeds/contact.seed';

describe('UpdateContactController', () => 
{
    let controller: UpdateContactController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                UpdateContactController
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

        controller  = module.get<UpdateContactController>(UpdateContactController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateContactController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateContactController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a contact created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(contacts[0])));
            expect(await controller.main(contacts[0])).toBe(contacts[0]);
        });
    });
});