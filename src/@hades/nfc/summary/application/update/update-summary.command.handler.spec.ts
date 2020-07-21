import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateSummaryCommandHandler } from './update-summary.command-handler';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';
import { UpdateSummaryCommand } from './update-summary.command';
import { UpdateSummaryService } from './update-summary.service';

describe('UpdateSummaryCommandHandler', () => 
{
    let commandHandler: UpdateSummaryCommandHandler;
    let service: UpdateSummaryService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateSummaryCommandHandler,
                {
                    provide: UpdateSummaryService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateSummaryCommandHandler>(UpdateSummaryCommandHandler);
        service         = module.get<UpdateSummaryService>(UpdateSummaryService);
    });

    describe('main', () => 
    {
        test('UpdateSummaryCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an summary created', async () => 
        {
            expect(await commandHandler.execute(
                new UpdateSummaryCommand(
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