import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteLangByIdCommandHandler } from './delete-lang-by-id.command-handler';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';
import { DeleteLangByIdCommand } from './delete-lang-by-id.command';
import { DeleteLangByIdService } from './delete-lang-by-id.service';

describe('DeleteLangByIdCommandHandler', () => 
{
    let commandHandler: DeleteLangByIdCommandHandler;
    let service: DeleteLangByIdService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteLangByIdCommandHandler,
                {
                    provide: DeleteLangByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteLangByIdCommandHandler>(DeleteLangByIdCommandHandler);
        service         = module.get<DeleteLangByIdService>(DeleteLangByIdService);
    });

    it('DeleteLangByIdCommandHandler should be defined', () => 
    {
        expect(commandHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('DeleteLangByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        it('should return an lang created', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteLangByIdCommand(
                    langs[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});