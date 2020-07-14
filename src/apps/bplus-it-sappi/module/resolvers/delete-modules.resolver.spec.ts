import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteModulesResolver } from './delete-modules.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { modules } from '@hades/bplus-it-sappi/module/infrastructure/seeds/module.seed';

describe('DeleteModulesResolver', () => 
{
    let resolver: DeleteModulesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteModulesResolver,
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

        resolver    = module.get<DeleteModulesResolver>(DeleteModulesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteModulesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteModulesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an modules deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(modules)));
            expect(await resolver.main([])).toBe(modules);
        });
    });
});