import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateLangsCommandHandler } from './create-langs.command-handler';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';
import { CreateLangsCommand } from './create-langs.command';
import { CreateLangsService } from './create-langs.service';

describe('CreateLangsCommandHandler', () => 
{
    let commandHandler: CreateLangsCommandHandler;
    let service: CreateLangsService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateLangsCommandHandler,
                {
                    provide: CreateLangsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateLangsCommandHandler>(CreateLangsCommandHandler);
        service         = module.get<CreateLangsService>(CreateLangsService);
    });

    describe('main', () => 
    {
        test('CreateLangsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an lang created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateLangsCommand(
                    langs
                
                )
            )).toBe(undefined);
        });
    });
});