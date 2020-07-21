import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateResourcesResolver } from './create-resources.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';
import { AdminCreateResourceInput } from './../../../../../src/graphql';

describe('CreateResourcesResolver', () => 
{
    let resolver: CreateResourcesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateResourcesResolver,
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

        resolver    = module.get<CreateResourcesResolver>(CreateResourcesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateResourcesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateResourcesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an resources created', async () => 
        {
            expect(await resolver.main(<AdminCreateResourceInput[]>resources)).toBe(true);
        });
    });
});