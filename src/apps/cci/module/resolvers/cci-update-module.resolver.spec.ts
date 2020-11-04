import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciUpdateModuleResolver } from './cci-update-module.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { modules } from '@hades/cci/module/infrastructure/seeds/module.seed';
import { CciUpdateModuleInput } from './../../../../graphql';

describe('CciUpdateModuleResolver', () => 
{
    let resolver: CciUpdateModuleResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciUpdateModuleResolver,
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

        resolver  = module.get<CciUpdateModuleResolver>(CciUpdateModuleResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciUpdateModuleResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciUpdateModuleResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a module created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(modules[0])));
            expect(await resolver.main(<CciUpdateModuleInput>modules[0])).toBe(modules[0]);
        });
    });
});