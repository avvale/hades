import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateSystemResolver } from './update-system.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { systems } from '@hades/bplus-it-sappi/system/infrastructure/seeds/system.seed'
import { BplusItSappiUpdateSystemInput } from './../../../../../src/graphql';

describe('UpdateSystemResolver', () => 
{
    let resolver: UpdateSystemResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateSystemResolver,
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

        resolver  = module.get<UpdateSystemResolver>(UpdateSystemResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateSystemResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateSystemResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a system created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(systems[0])));
            expect(await resolver.main(<BplusItSappiUpdateSystemInput>systems[0])).toBe(systems[0]);
        });
    });
});