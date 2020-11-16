import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateCountryResolver } from './admin-create-country.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';
import { AdminCreateCountryInput } from './../../../../graphql';

describe('AdminCreateCountryResolver', () =>
{
    let resolver: AdminCreateCountryResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminCreateCountryResolver,
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

        resolver    = module.get<AdminCreateCountryResolver>(AdminCreateCountryResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminCreateCountryResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminCreateCountryResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an country created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await resolver.main(<AdminCreateCountryInput>countries[0])).toBe(countries[0]);
        });
    });
});