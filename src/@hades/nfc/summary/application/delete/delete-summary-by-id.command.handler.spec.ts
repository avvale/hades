import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSummaryByIdCommandHandler } from './delete-summary-by-id.command-handler';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';
import { DeleteSummaryByIdCommand } from './delete-summary-by-id.command';
import { DeleteSummaryByIdService } from './delete-summary-by-id.service';

describe('DeleteSummaryByIdCommandHandler', () => 
{
    let commandHandler: DeleteSummaryByIdCommandHandler;
    let service: DeleteSummaryByIdService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteSummaryByIdCommandHandler,
                {
                    provide: DeleteSummaryByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteSummaryByIdCommandHandler>(DeleteSummaryByIdCommandHandler);
        service         = module.get<DeleteSummaryByIdService>(DeleteSummaryByIdService);
    });

    describe('main', () => 
    {
        test('DeleteSummaryByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteSummaryByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteSummaryByIdCommand(
                    summaries[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});