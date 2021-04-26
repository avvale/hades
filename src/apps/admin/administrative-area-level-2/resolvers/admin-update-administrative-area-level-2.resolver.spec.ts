import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminUpdateAdministrativeAreaLevel2Resolver } from './admin-update-administrative-area-level-2.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel2 } from '@hades/admin/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { AdminUpdateAdministrativeAreaLevel2Input } from './../../../../graphql';

describe('AdminUpdateAdministrativeAreaLevel2Resolver', () =>
{
    let resolver: AdminUpdateAdministrativeAreaLevel2Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminUpdateAdministrativeAreaLevel2Resolver,
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

        resolver    = module.get<AdminUpdateAdministrativeAreaLevel2Resolver>(AdminUpdateAdministrativeAreaLevel2Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminUpdateAdministrativeAreaLevel2Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AdminUpdateAdministrativeAreaLevel2Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreaLevel2 created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await resolver.main(<AdminUpdateAdministrativeAreaLevel2Input>administrativeAreasLevel2[0])).toBe(administrativeAreasLevel2[0]);
        });
    });
});