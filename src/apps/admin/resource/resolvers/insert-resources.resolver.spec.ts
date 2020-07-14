import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertResourcesResolver } from './insert-resources.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';
import { AdminCreateResourceInput } from './../../../../../src/graphql';

describe('InsertResourcesResolver', () => 
{
    let resolver: InsertResourcesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertResourcesResolver,
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

        resolver    = module.get<InsertResourcesResolver>(InsertResourcesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertResourcesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertResourcesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an resources created', async () => 
        {
            expect(await resolver.main(<AdminCreateResourceInput[]>resources)).toBe(true);
        });
    });
});