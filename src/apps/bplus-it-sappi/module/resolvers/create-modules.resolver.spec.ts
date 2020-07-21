import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateModulesResolver } from './create-modules.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { modules } from '@hades/bplus-it-sappi/module/infrastructure/seeds/module.seed';
import { BplusItSappiCreateModuleInput } from './../../../../graphql';

describe('CreateModulesResolver', () => 
{
    let resolver: CreateModulesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateModulesResolver,
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

        resolver    = module.get<CreateModulesResolver>(CreateModulesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateModulesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateModulesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an modules created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateModuleInput[]>modules)).toBe(true);
        });
    });
});