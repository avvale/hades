import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAdministrativeAreasLevel2Resolver } from './admin-create-administrative-areas-level-2.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel2 } from '@hades/admin/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { AdminCreateAdministrativeAreaLevel2Input } from './../../../../graphql';

describe('AdminCreateAdministrativeAreasLevel2Resolver', () =>
{
    let resolver: AdminCreateAdministrativeAreasLevel2Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminCreateAdministrativeAreasLevel2Resolver,
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

        resolver    = module.get<AdminCreateAdministrativeAreasLevel2Resolver>(AdminCreateAdministrativeAreasLevel2Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminCreateAdministrativeAreasLevel2Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AdminCreateAdministrativeAreasLevel2Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreasLevel2 created', async () =>
        {
            expect(await resolver.main(<AdminCreateAdministrativeAreaLevel2Input[]>administrativeAreasLevel2)).toBe(true);
        });
    });
});