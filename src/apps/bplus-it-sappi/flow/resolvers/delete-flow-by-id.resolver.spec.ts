import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteFlowByIdResolver } from './delete-flow-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/bplus-it-sappi/flow/infrastructure/seeds/flow.seed';

describe('DeleteFlowByIdResolver', () => 
{
    let resolver: DeleteFlowByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteFlowByIdResolver,
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

        resolver    = module.get<DeleteFlowByIdResolver>(DeleteFlowByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteFlowByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteFlowByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an flow deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(flows[0])));
            expect(await resolver.main(flows[0].id)).toBe(flows[0]);
        });
    });
});