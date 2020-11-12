import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminUpdateCountryResolver } from './admin-update-country.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';
import { AdminUpdateCountryInput } from './../../../../graphql';

describe('AdminUpdateCountryResolver', () => 
{
    let resolver: AdminUpdateCountryResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminUpdateCountryResolver,
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

        resolver  = module.get<AdminUpdateCountryResolver>(AdminUpdateCountryResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminUpdateCountryResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminUpdateCountryResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a country created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await resolver.main(<AdminUpdateCountryInput>countries[0])).toBe(countries[0]);
        });
    });
});