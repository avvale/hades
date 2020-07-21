import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateSessionsResolver } from './create-sessions.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';
import { NfcCreateSessionInput } from './../../../../graphql';

describe('CreateSessionsResolver', () => 
{
    let resolver: CreateSessionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateSessionsResolver,
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

        resolver    = module.get<CreateSessionsResolver>(CreateSessionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateSessionsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateSessionsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an sessions created', async () => 
        {
            expect(await resolver.main(<NfcCreateSessionInput[]>sessions)).toBe(true);
        });
    });
});