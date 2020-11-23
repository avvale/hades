import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAdministrativeAreasLevel1Resolver } from './admin-create-administrative-areas-level-1.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel1 } from '@hades/admin/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';
import { AdminCreateAdministrativeAreaLevel1Input } from './../../../../graphql';

describe('AdminCreateAdministrativeAreasLevel1Resolver', () => 
{
    let resolver: AdminCreateAdministrativeAreasLevel1Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminCreateAdministrativeAreasLevel1Resolver,
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

        resolver    = module.get<AdminCreateAdministrativeAreasLevel1Resolver>(AdminCreateAdministrativeAreasLevel1Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminCreateAdministrativeAreasLevel1Resolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminCreateAdministrativeAreasLevel1Resolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreasLevel1 created', async () => 
        {
            expect(await resolver.main(<AdminCreateAdministrativeAreaLevel1Input[]>administrativeAreasLevel1)).toBe(true);
        });
    });
});