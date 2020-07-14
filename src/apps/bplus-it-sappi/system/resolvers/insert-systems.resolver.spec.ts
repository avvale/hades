import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertSystemsResolver } from './insert-systems.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { systems } from '@hades/bplus-it-sappi/system/infrastructure/seeds/system.seed';
import { BplusItSappiCreateSystemInput } from './../../../../../src/graphql';

describe('InsertSystemsResolver', () => 
{
    let resolver: InsertSystemsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertSystemsResolver,
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

        resolver    = module.get<InsertSystemsResolver>(InsertSystemsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertSystemsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertSystemsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an systems created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateSystemInput[]>systems)).toBe(true);
        });
    });
});