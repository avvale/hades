import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertBoundedContextsCommandHandler } from './insert-bounded-contexts.command-handler';
import { boundedContexts } from '@hades/admin/bounded-context/infrastructure/seeds/bounded-context.seed';
import { InsertBoundedContextsCommand } from './insert-bounded-contexts.command';
import { InsertBoundedContextsService } from './insert-bounded-contexts.service';

describe('InsertBoundedContextsCommandHandler', () => 
{
    let commandHandler: InsertBoundedContextsCommandHandler;
    let service: InsertBoundedContextsService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertBoundedContextsCommandHandler,
                {
                    provide: InsertBoundedContextsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<InsertBoundedContextsCommandHandler>(InsertBoundedContextsCommandHandler);
        service         = module.get<InsertBoundedContextsService>(InsertBoundedContextsService);
    });

    it('InsertBoundedContextsCommandHandler should be defined', () => 
    {
        expect(commandHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertBoundedContextsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        it('should return an boundedContext created', async () => 
        {
            expect(await commandHandler.execute(
                new InsertBoundedContextsCommand(
                    boundedContexts
                
                )
            )).toBe(undefined);
        });
    });
});