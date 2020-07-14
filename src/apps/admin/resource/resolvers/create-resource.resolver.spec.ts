import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateResourceResolver } from './create-resource.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';
import { AdminCreateResourceInput } from './../../../../../src/graphql';

describe('CreateResourceResolver', () => 
{
    let resolver: CreateResourceResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateResourceResolver,
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

        resolver    = module.get<CreateResourceResolver>(CreateResourceResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('CreateResourceResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateResourceResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an resource created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(resources[0])));
            expect(await resolver.main(<AdminCreateResourceInput>resources[0])).toBe(resources[0]);
        });
    });
});