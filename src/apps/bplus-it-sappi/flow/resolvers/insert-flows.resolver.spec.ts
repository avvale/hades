import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertFlowsResolver } from './insert-flows.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/bplus-it-sappi/flow/infrastructure/seeds/flow.seed'
import { BplusItSappiCreateFlowInput } from './../../../../../src/graphql';

describe('InsertFlowsResolver', () => 
{
    let resolver: InsertFlowsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertFlowsResolver,
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

        resolver    = module.get<InsertFlowsResolver>(InsertFlowsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertFlowsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertFlowsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an flows created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateFlowInput[]>flows)).toBe(true);
        });
    });
});