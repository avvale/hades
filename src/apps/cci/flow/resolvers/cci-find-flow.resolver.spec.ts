import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindFlowResolver } from './cci-find-flow.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/cci/flow/infrastructure/seeds/flow.seed';

describe('CciFindFlowResolver', () => 
{
    let resolver: CciFindFlowResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciFindFlowResolver,
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

        resolver    = module.get<CciFindFlowResolver>(CciFindFlowResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciFindFlowResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciFindFlowResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a flow', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(flows[0])));
            expect(await resolver.main()).toBe(flows[0]);
        });
    });
});