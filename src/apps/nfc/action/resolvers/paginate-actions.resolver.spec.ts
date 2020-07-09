import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateActionsResolver } from './paginate-actions.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed'

describe('PaginateActionsResolver', () => 
{
    let resolver: PaginateActionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateActionsResolver,
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

        resolver    = module.get<PaginateActionsResolver>(PaginateActionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('PaginateActionsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('PaginateActionsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a actions', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(actions)));
            expect(await resolver.main([], [])).toBe(actions);
        });
    });
});