import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateSummaryCommandHandler } from './create-summary.command-handler';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';
import { CreateSummaryCommand } from './create-summary.command';
import { CreateSummaryService } from './create-summary.service';

describe('CreateSummaryCommandHandler', () => 
{
    let commandHandler: CreateSummaryCommandHandler;
    let service: CreateSummaryService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateSummaryCommandHandler,
                {
                    provide: CreateSummaryService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateSummaryCommandHandler>(CreateSummaryCommandHandler);
        service         = module.get<CreateSummaryService>(CreateSummaryService);
    });

    describe('main', () => 
    {
        test('CreateSummaryCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateSummaryService', async () => 
        {
            expect(await commandHandler.execute(
                new CreateSummaryCommand(
                    summaries[0].id,
                    summaries[0].tagId,
                    summaries[0].tenantId,
                    summaries[0].accessAt,
                    summaries[0].counter,
                    
                )
            )).toBe(undefined);
        });
    });
});