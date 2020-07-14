import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateSystemResolver } from './create-system.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { systems } from '@hades/bplus-it-sappi/system/infrastructure/seeds/system.seed'
import { BplusItSappiCreateSystemInput } from './../../../../../src/graphql';

describe('CreateSystemResolver', () => 
{
    let resolver: CreateSystemResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateSystemResolver,
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

        resolver    = module.get<CreateSystemResolver>(CreateSystemResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('CreateSystemResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateSystemResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an system created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(systems[0])));
            expect(await resolver.main(<BplusItSappiCreateSystemInput>systems[0])).toBe(systems[0]);
        });
    });
});