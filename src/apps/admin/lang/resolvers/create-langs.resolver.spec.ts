import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateLangsResolver } from './create-langs.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';
import { AdminCreateLangInput } from './../../../../graphql';

describe('CreateLangsResolver', () => 
{
    let resolver: CreateLangsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateLangsResolver,
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

        resolver    = module.get<CreateLangsResolver>(CreateLangsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateLangsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateLangsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an langs created', async () => 
        {
            expect(await resolver.main(<AdminCreateLangInput[]>langs)).toBe(true);
        });
    });
});