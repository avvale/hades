import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateLangCommandHandler } from './create-lang.command-handler';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';
import { CreateLangCommand } from './create-lang.command';
import { CreateLangService } from './create-lang.service';

describe('CreateLangCommandHandler', () => 
{
    let commandHandler: CreateLangCommandHandler;
    let service: CreateLangService;

    beforeEach(async () => 
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

    it('CreateLangCommandHandler should be defined', () => 
    {
        expect(commandHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateLangCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        it('should return an lang created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateLangCommand(
                    langs[0].id,
                    langs[0].name,
                    langs[0].image,
                    langs[0].iso6392,
                    langs[0].iso6393,
                    langs[0].ietf,
                    langs[0].sort,
                    langs[0].isActive,
                
                )
            )).toBe(undefined);
        });
    });
});