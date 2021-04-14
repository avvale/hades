import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminFindAdministrativeAreaLevel1ByIdResolver } from './admin-find-administrative-area-level-1-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel1 } from '@hades/admin/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('AdminFindAdministrativeAreaLevel1ByIdResolver', () =>
{
    let resolver: AdminFindAdministrativeAreaLevel1ByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminFindAdministrativeAreaLevel1ByIdResolver,
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

        resolver    = module.get<AdminFindAdministrativeAreaLevel1ByIdResolver>(AdminFindAdministrativeAreaLevel1ByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminFindAdministrativeAreaLevel1ByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AdminFindAdministrativeAreaLevel1ByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await resolver.main(administrativeAreasLevel1[0].id)).toBe(administrativeAreasLevel1[0]);
        });
    });
});