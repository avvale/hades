import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateLangCommandHandler } from './update-lang.command-handler';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';
import { UpdateLangCommand } from './update-lang.command';
import { UpdateLangService } from './update-lang.service';

describe('UpdateLangCommandHandler', () => 
{
    let commandHandler: UpdateLangCommandHandler;
    let service: UpdateLangService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateLangCommandHandler,
                {
                    provide: UpdateLangService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateLangCommandHandler>(UpdateLangCommandHandler);
        service         = module.get<UpdateLangService>(UpdateLangService);
    });

    describe('main', () => 
    {
        test('UpdateLangCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an lang created', async () => 
        {
            expect(await commandHandler.execute(
                new UpdateLangCommand(
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