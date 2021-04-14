import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminUpdateLangResolver } from './admin-update-lang.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';
import { AdminUpdateLangInput } from './../../../../graphql';

describe('AdminUpdateLangResolver', () =>
{
    let resolver: AdminUpdateLangResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminUpdateLangResolver,
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

        resolver  = module.get<AdminUpdateLangResolver>(AdminUpdateLangResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminUpdateLangResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AdminUpdateLangResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a lang created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await resolver.main(<AdminUpdateLangInput>langs[0])).toBe(langs[0]);
        });
    });
});