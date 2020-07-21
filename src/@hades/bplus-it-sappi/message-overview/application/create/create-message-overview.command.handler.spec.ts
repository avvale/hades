import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateMessageOverviewCommandHandler } from './create-message-overview.command-handler';
import { messagesOverview } from '@hades/bplus-it-sappi/message-overview/infrastructure/seeds/message-overview.seed';
import { CreateMessageOverviewCommand } from './create-message-overview.command';
import { CreateMessageOverviewService } from './create-message-overview.service';

describe('CreateMessageOverviewCommandHandler', () => 
{
    let commandHandler: CreateMessageOverviewCommandHandler;
    let service: CreateMessageOverviewService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateMessageOverviewCommandHandler,
                {
                    provide: CreateMessageOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateMessageOverviewCommandHandler>(CreateMessageOverviewCommandHandler);
        service         = module.get<CreateMessageOverviewService>(CreateMessageOverviewService);
    });

    describe('main', () => 
    {
        test('CreateMessageOverviewCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateMessageOverviewService', async () => 
        {
            expect(await commandHandler.execute(
                new CreateMessageOverviewCommand(
                    messagesOverview[0].id,
                    messagesOverview[0].tenantId,
                    messagesOverview[0].systemId,
                    messagesOverview[0].systemName,
                    messagesOverview[0].executionId,
                    messagesOverview[0].executionType,
                    messagesOverview[0].executionExecutedAt,
                    messagesOverview[0].executionMonitoringStartAt,
                    messagesOverview[0].executionMonitoringEndAt,
                    messagesOverview[0].numberMax,
                    messagesOverview[0].numberDays,
                    messagesOverview[0].success,
                    messagesOverview[0].cancelled,
                    messagesOverview[0].delivering,
                    messagesOverview[0].error,
                    messagesOverview[0].holding,
                    messagesOverview[0].toBeDelivered,
                    messagesOverview[0].waiting,
                    
                )
            )).toBe(undefined);
        });
    });
});