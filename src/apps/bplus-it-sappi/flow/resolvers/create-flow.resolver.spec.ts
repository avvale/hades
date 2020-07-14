import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateFlowResolver } from './create-flow.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/bplus-it-sappi/flow/infrastructure/seeds/flow.seed'
import { BplusItSappiCreateFlowInput } from './../../../../../src/graphql';

describe('CreateFlowResolver', () => 
{
    let resolver: CreateFlowResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateFlowResolver,
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

        resolver    = module.get<CreateFlowResolver>(CreateFlowResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('CreateFlowResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateFlowResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an flow created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(flows[0])));
            expect(await resolver.main(<BplusItSappiCreateFlowInput>flows[0])).toBe(flows[0]);
        });
    });
});