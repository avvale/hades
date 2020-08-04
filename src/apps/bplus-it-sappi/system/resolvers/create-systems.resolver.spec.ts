import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateSystemsResolver } from './create-systems.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { systems } from '@hades/bplus-it-sappi/system/infrastructure/seeds/system.seed';
import { BplusItSappiCreateSystemInput } from './../../../../graphql';

describe('CreateSystemsResolver', () => 
{
    let resolver: CreateSystemsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateSystemsResolver,
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

        resolver    = module.get<CreateSystemsResolver>(CreateSystemsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateSystemsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateSystemsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an systems created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateSystemInput[]>systems)).toBe(true);
        });
    });
});