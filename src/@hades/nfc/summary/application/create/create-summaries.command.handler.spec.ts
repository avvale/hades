import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateSummariesCommandHandler } from './create-summaries.command-handler';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';
import { CreateSummariesCommand } from './create-summaries.command';
import { CreateSummariesService } from './create-summaries.service';

describe('CreateSummariesCommandHandler', () => 
{
    let commandHandler: CreateSummariesCommandHandler;
    let service: CreateSummariesService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateSummariesCommandHandler,
                {
                    provide: CreateSummariesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateSummariesCommandHandler>(CreateSummariesCommandHandler);
        service         = module.get<CreateSummariesService>(CreateSummariesService);
    });

    describe('main', () => 
    {
        test('CreateSummariesCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an summary created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateSummariesCommand(
                    summaries
                
                )
            )).toBe(undefined);
        });
    });
});