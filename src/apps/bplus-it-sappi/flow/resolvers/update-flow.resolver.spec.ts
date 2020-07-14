import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateFlowResolver } from './update-flow.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/bplus-it-sappi/flow/infrastructure/seeds/flow.seed'
import { BplusItSappiUpdateFlowInput } from './../../../../../src/graphql';

describe('UpdateFlowResolver', () => 
{
    let resolver: UpdateFlowResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateFlowResolver,
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

        resolver  = module.get<UpdateFlowResolver>(UpdateFlowResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateFlowResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateFlowResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a flow created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(flows[0])));
            expect(await resolver.main(<BplusItSappiUpdateFlowInput>flows[0])).toBe(flows[0]);
        });
    });
});