import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminDeleteCountriesResolver } from './admin-delete-countries.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';

describe('AdminDeleteCountriesResolver', () =>
{
    let resolver: AdminDeleteCountriesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminDeleteCountriesResolver,
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

        resolver    = module.get<AdminDeleteCountriesResolver>(AdminDeleteCountriesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminDeleteCountriesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AdminDeleteCountriesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an countries deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(countries)));
            expect(await resolver.main()).toBe(countries);
        });
    });
});