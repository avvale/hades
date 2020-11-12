import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateResourceResolver } from './admin-create-resource.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';
import { AdminCreateResourceInput } from './../../../../graphql';

describe('AdminCreateResourceResolver', () =>
{
    let resolver: AdminCreateResourceResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminCreateResourceResolver,
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

        resolver    = module.get<AdminCreateResourceResolver>(AdminCreateResourceResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminCreateResourceResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminCreateResourceResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an resource created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(resources[0])));
            expect(await resolver.main(<AdminCreateResourceInput>resources[0])).toBe(resources[0]);
        });
    });
});