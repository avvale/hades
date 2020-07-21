import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateActionsResolver } from './create-actions.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed';
import { NfcCreateActionInput } from './../../../../graphql';

describe('CreateActionsResolver', () => 
{
    let resolver: CreateActionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateActionsResolver,
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

        resolver    = module.get<CreateActionsResolver>(CreateActionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateActionsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateActionsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an actions created', async () => 
        {
            expect(await resolver.main(<NfcCreateActionInput[]>actions)).toBe(true);
        });
    });
});