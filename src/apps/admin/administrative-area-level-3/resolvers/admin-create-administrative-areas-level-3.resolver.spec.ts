import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAdministrativeAreasLevel3Resolver } from './admin-create-administrative-areas-level-3.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel3 } from '@hades/admin/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';
import { AdminCreateAdministrativeAreaLevel3Input } from './../../../../graphql';

describe('AdminCreateAdministrativeAreasLevel3Resolver', () =>
{
    let resolver: AdminCreateAdministrativeAreasLevel3Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminCreateAdministrativeAreasLevel3Resolver,
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

        resolver    = module.get<AdminCreateAdministrativeAreasLevel3Resolver>(AdminCreateAdministrativeAreasLevel3Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminCreateAdministrativeAreasLevel3Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AdminCreateAdministrativeAreasLevel3Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreasLevel3 created', async () =>
        {
            expect(await resolver.main(<AdminCreateAdministrativeAreaLevel3Input[]>administrativeAreasLevel3)).toBe(true);
        });
    });
});