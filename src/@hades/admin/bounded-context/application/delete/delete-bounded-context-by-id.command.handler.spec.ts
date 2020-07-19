import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteBoundedContextByIdCommandHandler } from './delete-bounded-context-by-id.command-handler';
import { boundedContexts } from '@hades/admin/bounded-context/infrastructure/seeds/bounded-context.seed';
import { DeleteBoundedContextByIdCommand } from './delete-bounded-context-by-id.command';
import { DeleteBoundedContextByIdService } from './delete-bounded-context-by-id.service';

describe('DeleteBoundedContextByIdCommandHandler', () => 
{
    let commandHandler: DeleteBoundedContextByIdCommandHandler;
    let service: DeleteBoundedContextByIdService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteBoundedContextByIdCommandHandler,
                {
                    provide: DeleteBoundedContextByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteBoundedContextByIdCommandHandler>(DeleteBoundedContextByIdCommandHandler);
        service         = module.get<DeleteBoundedContextByIdService>(DeleteBoundedContextByIdService);
    });

    it('DeleteBoundedContextByIdCommandHandler should be defined', () => 
    {
        expect(commandHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('DeleteBoundedContextByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        it('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteBoundedContextByIdCommand(
                    BoundedContext[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});