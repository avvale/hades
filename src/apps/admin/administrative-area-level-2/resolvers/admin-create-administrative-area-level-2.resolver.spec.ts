import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAdministrativeAreaLevel2Resolver } from './admin-create-administrative-area-level-2.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel2 } from '@hades/admin/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { AdminCreateAdministrativeAreaLevel2Input } from './../../../../graphql';

describe('AdminCreateAdministrativeAreaLevel2Resolver', () =>
{
    let resolver: AdminCreateAdministrativeAreaLevel2Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminCreateAdministrativeAreaLevel2Resolver,
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

        resolver    = module.get<AdminCreateAdministrativeAreaLevel2Resolver>(AdminCreateAdministrativeAreaLevel2Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminCreateAdministrativeAreaLevel2Resolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminCreateAdministrativeAreaLevel2Resolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await resolver.main(<AdminCreateAdministrativeAreaLevel2Input>administrativeAreasLevel2[0])).toBe(administrativeAreasLevel2[0]);
        });
    });
});