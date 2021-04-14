import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminUpdateAdministrativeAreaLevel3Resolver } from './admin-update-administrative-area-level-3.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel3 } from '@hades/admin/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';
import { AdminUpdateAdministrativeAreaLevel3Input } from './../../../../graphql';

describe('AdminUpdateAdministrativeAreaLevel3Resolver', () =>
{
    let resolver: AdminUpdateAdministrativeAreaLevel3Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminUpdateAdministrativeAreaLevel3Resolver,
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

        resolver  = module.get<AdminUpdateAdministrativeAreaLevel3Resolver>(AdminUpdateAdministrativeAreaLevel3Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminUpdateAdministrativeAreaLevel3Resolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AdminUpdateAdministrativeAreaLevel3Resolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreaLevel3 created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await resolver.main(<AdminUpdateAdministrativeAreaLevel3Input>administrativeAreasLevel3[0])).toBe(administrativeAreasLevel3[0]);
        });
    });
});