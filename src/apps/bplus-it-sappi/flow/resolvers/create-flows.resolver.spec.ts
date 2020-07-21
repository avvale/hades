import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateFlowsResolver } from './create-flows.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/bplus-it-sappi/flow/infrastructure/seeds/flow.seed';
import { BplusItSappiCreateFlowInput } from './../../../../../src/graphql';

describe('CreateFlowsResolver', () => 
{
    let resolver: CreateFlowsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateFlowsResolver,
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

        resolver    = module.get<CreateFlowsResolver>(CreateFlowsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateFlowsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateFlowsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an flows created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateFlowInput[]>flows)).toBe(true);
        });
    });
});