import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateBoundedContextCommandHandler } from './create-bounded-context.command-handler';
import { boundedContexts } from '@hades/admin/bounded-context/infrastructure/seeds/bounded-context.seed';
import { CreateBoundedContextCommand } from './create-bounded-context.command';
import { CreateBoundedContextService } from './create-bounded-context.service';

describe('CreateBoundedContextCommandHandler', () => 
{
    let commandHandler: CreateBoundedContextCommandHandler;
    let service: CreateBoundedContextService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateBoundedContextCommandHandler,
                {
                    provide: CreateBoundedContextService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateBoundedContextCommandHandler>(CreateBoundedContextCommandHandler);
        service         = module.get<CreateBoundedContextService>(CreateBoundedContextService);
    });

    it('CreateBoundedContextCommandHandler should be defined', () => 
    {
        expect(commandHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateBoundedContextCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        it('should return an boundedContext created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateBoundedContextCommand(
                    boundedContexts[0].id,
                    boundedContexts[0].name,
                    boundedContexts[0].root,
                    boundedContexts[0].sort,
                    boundedContexts[0].isActive,
                    
                )
            )).toBe(undefined);
        });
    });
});