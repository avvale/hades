import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminUpdateAdministrativeAreaLevel1Resolver } from './admin-update-administrative-area-level-1.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel1 } from '@hades/admin/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';
import { AdminUpdateAdministrativeAreaLevel1Input } from './../../../../graphql';

describe('AdminUpdateAdministrativeAreaLevel1Resolver', () => 
{
    let resolver: AdminUpdateAdministrativeAreaLevel1Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminUpdateAdministrativeAreaLevel1Resolver,
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

        resolver  = module.get<AdminUpdateAdministrativeAreaLevel1Resolver>(AdminUpdateAdministrativeAreaLevel1Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminUpdateAdministrativeAreaLevel1Resolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminUpdateAdministrativeAreaLevel1Resolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreaLevel1 created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await resolver.main(<AdminUpdateAdministrativeAreaLevel1Input>administrativeAreasLevel1[0])).toBe(administrativeAreasLevel1[0]);
        });
    });
});