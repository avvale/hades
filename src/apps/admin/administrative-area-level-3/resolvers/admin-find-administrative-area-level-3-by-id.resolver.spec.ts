import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminFindAdministrativeAreaLevel3ByIdResolver } from './admin-find-administrative-area-level-3-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel3 } from '@hades/admin/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('AdminFindAdministrativeAreaLevel3ByIdResolver', () => 
{
    let resolver: AdminFindAdministrativeAreaLevel3ByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminFindAdministrativeAreaLevel3ByIdResolver,
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

        resolver    = module.get<AdminFindAdministrativeAreaLevel3ByIdResolver>(AdminFindAdministrativeAreaLevel3ByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminFindAdministrativeAreaLevel3ByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminFindAdministrativeAreaLevel3ByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await resolver.main(administrativeAreasLevel3[0].id)).toBe(administrativeAreasLevel3[0]);
        });
    });
});