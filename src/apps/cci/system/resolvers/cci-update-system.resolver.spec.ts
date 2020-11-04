import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciUpdateSystemResolver } from './cci-update-system.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { systems } from '@hades/cci/system/infrastructure/seeds/system.seed';
import { CciUpdateSystemInput } from './../../../../graphql';

describe('CciUpdateSystemResolver', () => 
{
    let resolver: CciUpdateSystemResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciUpdateSystemResolver,
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

        resolver  = module.get<CciUpdateSystemResolver>(CciUpdateSystemResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciUpdateSystemResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciUpdateSystemResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a system created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(systems[0])));
            expect(await resolver.main(<CciUpdateSystemInput>systems[0])).toBe(systems[0]);
        });
    });
});