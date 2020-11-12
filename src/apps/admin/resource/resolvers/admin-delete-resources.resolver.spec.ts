import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminDeleteResourcesResolver } from './admin-delete-resources.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';

describe('AdminDeleteResourcesResolver', () => 
{
    let resolver: AdminDeleteResourcesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminDeleteResourcesResolver,
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

        resolver    = module.get<AdminDeleteResourcesResolver>(AdminDeleteResourcesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminDeleteResourcesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminDeleteResourcesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an resources deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(resources)));
            expect(await resolver.main()).toBe(resources);
        });
    });
});