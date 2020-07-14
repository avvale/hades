import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateModulesResolver } from './paginate-modules.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { modules } from '@hades/bplus-it-sappi/module/infrastructure/seeds/module.seed';

describe('PaginateModulesResolver', () => 
{
    let resolver: PaginateModulesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateModulesResolver,
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

        resolver    = module.get<PaginateModulesResolver>(PaginateModulesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('PaginateModulesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('PaginateModulesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a modules', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(modules)));
            expect(await resolver.main([], [])).toBe(modules);
        });
    });
});