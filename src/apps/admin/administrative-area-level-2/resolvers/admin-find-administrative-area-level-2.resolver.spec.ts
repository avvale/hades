import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminFindAdministrativeAreaLevel2Resolver } from './admin-find-administrative-area-level-2.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel2 } from '@hades/admin/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('AdminFindAdministrativeAreaLevel2Resolver', () => 
{
    let resolver: AdminFindAdministrativeAreaLevel2Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminFindAdministrativeAreaLevel2Resolver,
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

        resolver    = module.get<AdminFindAdministrativeAreaLevel2Resolver>(AdminFindAdministrativeAreaLevel2Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminFindAdministrativeAreaLevel2Resolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminFindAdministrativeAreaLevel2Resolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreaLevel2', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await resolver.main()).toBe(administrativeAreasLevel2[0]);
        });
    });
});