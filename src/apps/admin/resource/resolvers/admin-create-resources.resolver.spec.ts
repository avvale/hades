import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateResourcesResolver } from './admin-create-resources.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';
import { AdminCreateResourceInput } from './../../../../graphql';

describe('AdminCreateResourcesResolver', () =>
{
    let resolver: AdminCreateResourcesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminCreateResourcesResolver,
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

        resolver    = module.get<AdminCreateResourcesResolver>(AdminCreateResourcesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminCreateResourcesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AdminCreateResourcesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an resources created', async () =>
        {
            expect(await resolver.main(<AdminCreateResourceInput[]>resources)).toBe(true);
        });
    });
});