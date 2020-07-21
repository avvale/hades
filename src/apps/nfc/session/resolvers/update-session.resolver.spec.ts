import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateSessionResolver } from './update-session.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';
import { NfcUpdateSessionInput } from './../../../../graphql';

describe('UpdateSessionResolver', () => 
{
    let resolver: UpdateSessionResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateSessionResolver,
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

        resolver  = module.get<UpdateSessionResolver>(UpdateSessionResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('UpdateSessionResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('UpdateSessionResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a session created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(sessions[0])));
            expect(await resolver.main(<NfcUpdateSessionInput>sessions[0])).toBe(sessions[0]);
        });
    });
});