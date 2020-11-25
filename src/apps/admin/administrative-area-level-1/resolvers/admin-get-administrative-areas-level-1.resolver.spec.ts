import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminGetAdministrativeAreasLevel1Resolver } from './admin-get-administrative-areas-level-1.resolver'; 
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel1 } from '@hades/admin/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('AdminGetAdministrativeAreasLevel1Resolver', () => 
{
    let resolver:   AdminGetAdministrativeAreasLevel1Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminGetAdministrativeAreasLevel1Resolver,
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

        resolver    = module.get<AdminGetAdministrativeAreasLevel1Resolver>(AdminGetAdministrativeAreasLevel1Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminGetAdministrativeAreasLevel1Resolver should be defined', () => 
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminGetAdministrativeAreasLevel1Resolver should be defined', () => 
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a administrativeAreasLevel1', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1)));
            expect(await resolver.main()).toBe(administrativeAreasLevel1);
        });
    });
});