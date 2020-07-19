import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertLangsCommandHandler } from './insert-langs.command-handler';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';
import { InsertLangsCommand } from './insert-langs.command';
import { InsertLangsService } from './insert-langs.service';

describe('InsertLangsCommandHandler', () => 
{
    let commandHandler: InsertLangsCommandHandler;
    let service: InsertLangsService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertLangsCommandHandler,
                {
                    provide: InsertLangsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<InsertLangsCommandHandler>(InsertLangsCommandHandler);
        service         = module.get<InsertLangsService>(InsertLangsService);
    });

    it('InsertLangsCommandHandler should be defined', () => 
    {
        expect(commandHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertLangsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        it('should return an lang created', async () => 
        {
            expect(await commandHandler.execute(
                new InsertLangsCommand(
                    langs
                )
            )).toBe(undefined);
        });
    });
});