import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateLangsResolver } from './admin-create-langs.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';
import { AdminCreateLangInput } from './../../../../graphql';

describe('AdminCreateLangsResolver', () => 
{
    let resolver: AdminCreateLangsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminCreateLangsResolver,
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

        resolver    = module.get<AdminCreateLangsResolver>(AdminCreateLangsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminCreateLangsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminCreateLangsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an langs created', async () => 
        {
            expect(await resolver.main(<AdminCreateLangInput[]>langs)).toBe(true);
        });
    });
});