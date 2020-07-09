import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSessionByIdResolver } from './delete-session-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed'

describe('DeleteSessionByIdResolver', () => 
{
    let resolver: DeleteSessionByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteSessionByIdResolver,
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

        resolver    = module.get<DeleteSessionByIdResolver>(DeleteSessionByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteSessionByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteSessionByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an session deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(sessions[0])));
            expect(await resolver.main(sessions[0].id)).toBe(sessions[0]);
        });
    });
});