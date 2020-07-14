import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetActionsResolver } from './get-actions.resolver'; 
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed';

describe('GetActionsResolver', () => 
{
    let resolver:   GetActionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetActionsResolver,
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

        resolver    = module.get<GetActionsResolver>(GetActionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('GetActionsResolver should be defined', () => 
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () => 
    {
        it('GetActionsResolver should be defined', () => 
        {
            expect(resolver).   toBeDefined();
        });

        it('should return a actions', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(actions)));
            expect(await resolver.main([])).toBe(actions);
        });
    });
});