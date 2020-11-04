import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateModulesResolver } from './cci-create-modules.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { modules } from '@hades/cci/module/infrastructure/seeds/module.seed';
import { CciCreateModuleInput } from './../../../../graphql';

describe('CciCreateModulesResolver', () => 
{
    let resolver: CciCreateModulesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateModulesResolver,
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

        resolver    = module.get<CciCreateModulesResolver>(CciCreateModulesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateModulesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciCreateModulesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an modules created', async () => 
        {
            expect(await resolver.main(<CciCreateModuleInput[]>modules)).toBe(true);
        });
    });
});