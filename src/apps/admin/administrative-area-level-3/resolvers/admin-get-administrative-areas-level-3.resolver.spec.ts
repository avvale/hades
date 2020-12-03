import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminGetAdministrativeAreasLevel3Resolver } from './admin-get-administrative-areas-level-3.resolver'; 
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel3 } from '@hades/admin/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('AdminGetAdministrativeAreasLevel3Resolver', () => 
{
    let resolver:   AdminGetAdministrativeAreasLevel3Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminGetAdministrativeAreasLevel3Resolver,
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

        resolver    = module.get<AdminGetAdministrativeAreasLevel3Resolver>(AdminGetAdministrativeAreasLevel3Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminGetAdministrativeAreasLevel3Resolver should be defined', () => 
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminGetAdministrativeAreasLevel3Resolver should be defined', () => 
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a administrativeAreasLevel3', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3)));
            expect(await resolver.main()).toBe(administrativeAreasLevel3);
        });
    });
});