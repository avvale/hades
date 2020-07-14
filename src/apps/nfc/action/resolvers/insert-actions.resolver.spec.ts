import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertActionsResolver } from './insert-actions.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed';
import { NfcCreateActionInput } from './../../../../../src/graphql';

describe('InsertActionsResolver', () => 
{
    let resolver: InsertActionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertActionsResolver,
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

        resolver    = module.get<InsertActionsResolver>(InsertActionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertActionsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertActionsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an actions created', async () => 
        {
            expect(await resolver.main(<NfcCreateActionInput[]>actions)).toBe(true);
        });
    });
});