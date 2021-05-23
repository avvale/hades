import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciDeleteModuleByIdResolver } from './cci-delete-module-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { modules } from '@hades/cci/module/infrastructure/seeds/module.seed';

describe('CciDeleteModuleByIdResolver', () =>
{
    let resolver: CciDeleteModuleByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciDeleteModuleByIdResolver,
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

        resolver    = module.get<CciDeleteModuleByIdResolver>(CciDeleteModuleByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciDeleteModuleByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciDeleteModuleByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an module deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(modules[0])));
            expect(await resolver.main(modules[0].id)).toBe(modules[0]);
        });
    });
});