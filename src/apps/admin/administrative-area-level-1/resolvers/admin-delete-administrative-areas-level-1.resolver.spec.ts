import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminDeleteAdministrativeAreasLevel1Resolver } from './admin-delete-administrative-areas-level-1.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel1 } from '@hades/admin/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('AdminDeleteAdministrativeAreasLevel1Resolver', () => 
{
    let resolver: AdminDeleteAdministrativeAreasLevel1Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminDeleteAdministrativeAreasLevel1Resolver,
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

        resolver    = module.get<AdminDeleteAdministrativeAreasLevel1Resolver>(AdminDeleteAdministrativeAreasLevel1Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminDeleteAdministrativeAreasLevel1Resolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminDeleteAdministrativeAreasLevel1Resolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreasLevel1 deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1)));
            expect(await resolver.main()).toBe(administrativeAreasLevel1);
        });
    });
});