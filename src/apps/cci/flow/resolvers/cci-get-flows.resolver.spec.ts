import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciGetFlowsResolver } from './cci-get-flows.resolver'; 
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/cci/flow/infrastructure/seeds/flow.seed';

describe('CciGetFlowsResolver', () => 
{
    let resolver:   CciGetFlowsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciGetFlowsResolver,
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

        resolver    = module.get<CciGetFlowsResolver>(CciGetFlowsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciGetFlowsResolver should be defined', () => 
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () => 
    {
        test('CciGetFlowsResolver should be defined', () => 
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a flows', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(flows)));
            expect(await resolver.main()).toBe(flows);
        });
    });
});