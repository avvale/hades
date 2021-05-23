import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';
import { CreateLangCommandHandler } from './create-lang.command-handler';
import { CreateLangCommand } from './create-lang.command';
import { CreateLangService } from './create-lang.service';

describe('CreateLangCommandHandler', () =>
{
    let commandHandler: CreateLangCommandHandler;
    let service: CreateLangService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateLangCommandHandler,
                {
                    provide: CreateLangService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateLangCommandHandler>(CreateLangCommandHandler);
        service         = module.get<CreateLangService>(CreateLangService);
    });

    describe('main', () =>
    {
        test('CreateLangCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateLangService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateLangCommand(
                    {
                        id: langs[0].id,
                        name: langs[0].name,
                        image: langs[0].image,
                        iso6392: langs[0].iso6392,
                        iso6393: langs[0].iso6393,
                        ietf: langs[0].ietf,
                        customCode: langs[0].customCode,
                        dir: langs[0].dir,
                        sort: langs[0].sort,
                        isActive: langs[0].isActive,
                    }
                )
            )).toBe(undefined);
        });
    });
});