import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindModuleResolver } from './cci-find-module.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { modules } from '@hades/cci/module/infrastructure/seeds/module.seed';

describe('CciFindModuleResolver', () => 
{
    let resolver: CciFindModuleResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciFindModuleResolver,
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

        resolver    = module.get<CciFindModuleResolver>(CciFindModuleResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciFindModuleResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciFindModuleResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a module', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(modules[0])));
            expect(await resolver.main()).toBe(modules[0]);
        });
    });
});