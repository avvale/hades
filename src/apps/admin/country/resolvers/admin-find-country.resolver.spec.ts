import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminFindCountryResolver } from './admin-find-country.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';

describe('AdminFindCountryResolver', () =>
{
    let resolver: AdminFindCountryResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminFindCountryResolver,
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

        resolver    = module.get<AdminFindCountryResolver>(AdminFindCountryResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminFindCountryResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AdminFindCountryResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a country', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await resolver.main()).toBe(countries[0]);
        });
    });
});