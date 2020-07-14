import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateSessionResolver } from './create-session.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';

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

    it('CreateSessionResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateSessionResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an session created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(sessions[0])));
            expect(await resolver.main(sessions[0])).toBe(sessions[0]);
        });
    });
});