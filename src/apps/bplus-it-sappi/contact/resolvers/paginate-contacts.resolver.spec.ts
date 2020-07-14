import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateContactsResolver } from './paginate-contacts.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { contacts } from '@hades/bplus-it-sappi/contact/infrastructure/seeds/contact.seed';

describe('PaginateContactsResolver', () => 
{
    let resolver: PaginateContactsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateContactsResolver,
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

        resolver    = module.get<PaginateContactsResolver>(PaginateContactsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('PaginateContactsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('PaginateContactsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a contacts', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(contacts)));
            expect(await resolver.main([], [])).toBe(contacts);
        });
    });
});