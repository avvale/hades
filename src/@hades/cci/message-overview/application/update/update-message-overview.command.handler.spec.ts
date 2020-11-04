import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateMessageOverviewCommandHandler } from './update-message-overview.command-handler';
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';
import { UpdateMessageOverviewCommand } from './update-message-overview.command';
import { UpdateMessageOverviewService } from './update-message-overview.service';

describe('UpdateMessageOverviewCommandHandler', () =>
{
    let commandHandler: UpdateMessageOverviewCommandHandler;
    let service: UpdateMessageOverviewService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateMessageOverviewCommandHandler,
                {
                    provide: UpdateMessageOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateMessageOverviewCommandHandler>(UpdateMessageOverviewCommandHandler);
        service         = module.get<UpdateMessageOverviewService>(UpdateMessageOverviewService);
    });

    describe('main', () =>
    {
        test('UpdateMessageOverviewCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an messageOverview created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateMessageOverviewCommand(
                    messagesOverview[0].id,
                    messagesOverview[0].tenantId,
                    messagesOverview[0].tenantCode,
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