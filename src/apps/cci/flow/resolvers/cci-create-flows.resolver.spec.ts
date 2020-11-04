import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateFlowsResolver } from './cci-create-flows.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/cci/flow/infrastructure/seeds/flow.seed';
import { CciCreateFlowInput } from './../../../../graphql';

describe('CciCreateFlowsResolver', () => 
{
    let resolver: CciCreateFlowsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateFlowsResolver,
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

        resolver    = module.get<CciCreateFlowsResolver>(CciCreateFlowsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateFlowsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciCreateFlowsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an flows created', async () => 
        {
            expect(await resolver.main(<CciCreateFlowInput[]>flows)).toBe(true);
        });
    });
});