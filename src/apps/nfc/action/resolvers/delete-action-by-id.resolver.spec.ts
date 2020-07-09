import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteActionByIdResolver } from './delete-action-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed'

describe('DeleteActionByIdResolver', () => 
{
    let resolver: DeleteActionByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteActionByIdResolver,
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

        resolver    = module.get<DeleteActionByIdResolver>(DeleteActionByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteActionByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteActionByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an action deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(actions[0])));
            expect(await resolver.main(actions[0].id)).toBe(actions[0]);
        });
    });
});