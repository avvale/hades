import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateFlowResolver } from './cci-create-flow.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/cci/flow/infrastructure/seeds/flow.seed';
import { CciCreateFlowInput } from './../../../../graphql';

describe('CciCreateFlowResolver', () =>
{
    let resolver: CciCreateFlowResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateFlowResolver,
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

        resolver    = module.get<CciCreateFlowResolver>(CciCreateFlowResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateFlowResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciCreateFlowResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an flow created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(flows[0])));
            expect(await resolver.main(<CciCreateFlowInput>flows[0])).toBe(flows[0]);
        });
    });
});