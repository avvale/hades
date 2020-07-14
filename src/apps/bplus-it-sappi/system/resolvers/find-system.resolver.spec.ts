import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindSystemResolver } from './find-system.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { systems } from '@hades/bplus-it-sappi/system/infrastructure/seeds/system.seed';

describe('FindSystemResolver', () => 
{
    let resolver: FindSystemResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindSystemResolver,
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

        resolver    = module.get<FindSystemResolver>(FindSystemResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindSystemResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindSystemResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a system', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(systems[0])));
            expect(await resolver.main([])).toBe(systems[0]);
        });
    });
});