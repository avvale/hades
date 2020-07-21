import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateSessionResolver } from './create-session.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';
import { NfcCreateSessionInput } from './../../../../graphql';

describe('CreateSessionResolver', () => 
{
    let resolver: CreateSessionResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateSessionResolver,
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

        resolver    = module.get<CreateSessionResolver>(CreateSessionResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateSessionResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateSessionResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an session created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(sessions[0])));
            expect(await resolver.main(<NfcCreateSessionInput>sessions[0])).toBe(sessions[0]);
        });
    });
});