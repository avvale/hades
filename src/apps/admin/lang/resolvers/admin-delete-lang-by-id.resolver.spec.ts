import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminDeleteLangByIdResolver } from './admin-delete-lang-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';

describe('AdminDeleteLangByIdResolver', () =>
{
    let resolver: AdminDeleteLangByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminDeleteLangByIdResolver,
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

        resolver    = module.get<AdminDeleteLangByIdResolver>(AdminDeleteLangByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminDeleteLangByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AdminDeleteLangByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an lang deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await resolver.main(langs[0].id)).toBe(langs[0]);
        });
    });
});