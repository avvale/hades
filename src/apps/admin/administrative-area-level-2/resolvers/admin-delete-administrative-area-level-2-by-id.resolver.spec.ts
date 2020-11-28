import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminDeleteAdministrativeAreaLevel2ByIdResolver } from './admin-delete-administrative-area-level-2-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel2 } from '@hades/admin/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('AdminDeleteAdministrativeAreaLevel2ByIdResolver', () => 
{
    let resolver: AdminDeleteAdministrativeAreaLevel2ByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminDeleteAdministrativeAreaLevel2ByIdResolver,
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

        resolver    = module.get<AdminDeleteAdministrativeAreaLevel2ByIdResolver>(AdminDeleteAdministrativeAreaLevel2ByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminDeleteAdministrativeAreaLevel2ByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminDeleteAdministrativeAreaLevel2ByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await resolver.main(administrativeAreasLevel2[0].id)).toBe(administrativeAreasLevel2[0]);
        });
    });
});