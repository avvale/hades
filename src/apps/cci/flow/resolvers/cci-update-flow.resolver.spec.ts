import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciUpdateFlowResolver } from './cci-update-flow.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/cci/flow/infrastructure/seeds/flow.seed';
import { CciUpdateFlowInput } from './../../../../graphql';

describe('CciUpdateFlowResolver', () => 
{
    let resolver: CciUpdateFlowResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciUpdateFlowResolver,
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

        resolver  = module.get<CciUpdateFlowResolver>(CciUpdateFlowResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciUpdateFlowResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciUpdateFlowResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a flow created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(flows[0])));
            expect(await resolver.main(<CciUpdateFlowInput>flows[0])).toBe(flows[0]);
        });
    });
});