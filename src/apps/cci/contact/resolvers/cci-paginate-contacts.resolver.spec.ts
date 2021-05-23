import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciPaginateContactsResolver } from './cci-paginate-contacts.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { contacts } from '@hades/cci/contact/infrastructure/seeds/contact.seed';

describe('CciPaginateContactsResolver', () =>
{
    let resolver: CciPaginateContactsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciPaginateContactsResolver,
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

        resolver    = module.get<CciPaginateContactsResolver>(CciPaginateContactsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciPaginateContactsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciPaginateContactsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a contacts', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(contacts)));
            expect(await resolver.main()).toBe(contacts);
        });
    });
});