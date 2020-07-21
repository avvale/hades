import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSummariesCommandHandler } from './delete-summaries.command-handler';
import { DeleteSummariesCommand } from './delete-summaries.command';
import { DeleteSummariesService } from './delete-summaries.service';

describe('DeleteSummariesCommandHandler', () => 
{
    let commandHandler: DeleteSummariesCommandHandler;
    let service: DeleteSummariesService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteSummariesCommandHandler,
                {
                    provide: DeleteSummariesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteSummariesCommandHandler>(DeleteSummariesCommandHandler);
        service         = module.get<DeleteSummariesService>(DeleteSummariesService);
    });

    describe('main', () => 
    {
        test('DeleteSummariesCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteSummariesCommand()
            )).toBe(undefined);
        });
    });
});