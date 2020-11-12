import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminUpdateResourceResolver } from './admin-update-resource.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';
import { AdminUpdateResourceInput } from './../../../../graphql';

describe('AdminUpdateResourceResolver', () => 
{
    let resolver: AdminUpdateResourceResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminUpdateResourceResolver,
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

        resolver  = module.get<AdminUpdateResourceResolver>(AdminUpdateResourceResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminUpdateResourceResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminUpdateResourceResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a resource created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(resources[0])));
            expect(await resolver.main(<AdminUpdateResourceInput>resources[0])).toBe(resources[0]);
        });
    });
});