import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminDeleteAdministrativeAreasLevel2Resolver } from './admin-delete-administrative-areas-level-2.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel2 } from '@hades/admin/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('AdminDeleteAdministrativeAreasLevel2Resolver', () => 
{
    let resolver: AdminDeleteAdministrativeAreasLevel2Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminDeleteAdministrativeAreasLevel2Resolver,
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

        resolver    = module.get<AdminDeleteAdministrativeAreasLevel2Resolver>(AdminDeleteAdministrativeAreasLevel2Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminDeleteAdministrativeAreasLevel2Resolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminDeleteAdministrativeAreasLevel2Resolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreasLevel2 deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2)));
            expect(await resolver.main()).toBe(administrativeAreasLevel2);
        });
    });
});