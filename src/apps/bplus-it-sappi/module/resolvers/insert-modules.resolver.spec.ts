import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertModulesResolver } from './insert-modules.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { modules } from '@hades/bplus-it-sappi/module/infrastructure/seeds/module.seed';
import { BplusItSappiCreateModuleInput } from './../../../../../src/graphql';

describe('InsertModulesResolver', () => 
{
    let resolver: InsertModulesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertModulesResolver,
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

        resolver    = module.get<InsertModulesResolver>(InsertModulesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertModulesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertModulesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an modules created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateModuleInput[]>modules)).toBe(true);
        });
    });
});