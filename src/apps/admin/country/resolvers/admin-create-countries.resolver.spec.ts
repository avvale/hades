import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateCountriesResolver } from './admin-create-countries.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';
import { AdminCreateCountryInput } from './../../../../graphql';

describe('AdminCreateCountriesResolver', () => 
{
    let resolver: AdminCreateCountriesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminCreateCountriesResolver,
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

        resolver    = module.get<AdminCreateCountriesResolver>(AdminCreateCountriesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminCreateCountriesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminCreateCountriesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an countries created', async () => 
        {
            expect(await resolver.main(<AdminCreateCountryInput[]>countries)).toBe(true);
        });
    });
});