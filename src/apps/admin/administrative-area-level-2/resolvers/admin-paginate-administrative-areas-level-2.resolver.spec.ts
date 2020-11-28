import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminPaginateAdministrativeAreasLevel2Resolver } from './admin-paginate-administrative-areas-level-2.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel2 } from '@hades/admin/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('AdminPaginateAdministrativeAreasLevel2Resolver', () => 
{
    let resolver: AdminPaginateAdministrativeAreasLevel2Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminPaginateAdministrativeAreasLevel2Resolver,
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

        resolver    = module.get<AdminPaginateAdministrativeAreasLevel2Resolver>(AdminPaginateAdministrativeAreasLevel2Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminPaginateAdministrativeAreasLevel2Resolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminPaginateAdministrativeAreasLevel2Resolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreasLevel2', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2)));
            expect(await resolver.main()).toBe(administrativeAreasLevel2);
        });
    });
});