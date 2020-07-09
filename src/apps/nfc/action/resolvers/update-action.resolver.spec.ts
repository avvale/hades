import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateActionResolver } from './update-action.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed'

describe('UpdateActionResolver', () => 
{
    let resolver: UpdateActionResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateActionResolver,
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

        resolver  = module.get<UpdateActionResolver>(UpdateActionResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateActionResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateActionResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a action created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(actions[0])));
            expect(await resolver.main(actions[0])).toBe(actions[0]);
        });
    });
});