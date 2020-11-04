import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindSystemResolver } from './cci-find-system.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { systems } from '@hades/cci/system/infrastructure/seeds/system.seed';

describe('CciFindSystemResolver', () => 
{
    let resolver: CciFindSystemResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciFindSystemResolver,
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

        resolver    = module.get<CciFindSystemResolver>(CciFindSystemResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciFindSystemResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciFindSystemResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a system', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(systems[0])));
            expect(await resolver.main()).toBe(systems[0]);
        });
    });
});