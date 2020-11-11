import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminGetCountriesResolver } from './admin-get-countries.resolver'; 
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';

describe('AdminGetCountriesResolver', () => 
{
    let resolver:   AdminGetCountriesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminGetCountriesResolver,
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

        resolver    = module.get<AdminGetCountriesResolver>(AdminGetCountriesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminGetCountriesResolver should be defined', () => 
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminGetCountriesResolver should be defined', () => 
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a countries', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(countries)));
            expect(await resolver.main()).toBe(countries);
        });
    });
});