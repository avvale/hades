import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSessionsResolver } from './delete-sessions.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed'

describe('DeleteSessionsResolver', () => 
{
    let resolver: DeleteSessionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteSessionsResolver,
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

        resolver    = module.get<DeleteSessionsResolver>(DeleteSessionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteSessionsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteSessionsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an sessions deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(sessions)));
            expect(await resolver.main([])).toBe(sessions);
        });
    });
});