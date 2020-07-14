import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindSystemByIdResolver } from './find-system-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { systems } from '@hades/bplus-it-sappi/system/infrastructure/seeds/system.seed';

describe('FindSystemByIdResolver', () => 
{
    let resolver: FindSystemByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindSystemByIdResolver,
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

        resolver    = module.get<FindSystemByIdResolver>(FindSystemByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindSystemByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindSystemByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an system by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(systems[0])));
            expect(await resolver.main(systems[0].id)).toBe(systems[0]);
        });
    });
});