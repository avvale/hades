import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';
import { UpdateMessageOverviewCommandHandler } from './update-message-overview.command-handler';
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
                    {
                        id: messagesOverview[0].id,
                        tenantId: messagesOverview[0].tenantId,
                        tenantCode: messagesOverview[0].tenantCode,
                        systemId: messagesOverview[0].systemId,
                        systemName: messagesOverview[0].systemName,
                        executionId: messagesOverview[0].executionId,
                        executionType: messagesOverview[0].executionType,
                        executionExecutedAt: messagesOverview[0].executionExecutedAt,
                        executionMonitoringStartAt: messagesOverview[0].executionMonitoringStartAt,
                        executionMonitoringEndAt: messagesOverview[0].executionMonitoringEndAt,
                        numberMax: messagesOverview[0].numberMax,
                        numberDays: messagesOverview[0].numberDays,
                        success: messagesOverview[0].success,
                        cancelled: messagesOverview[0].cancelled,
                        delivering: messagesOverview[0].delivering,
                        error: messagesOverview[0].error,
                        holding: messagesOverview[0].holding,
                        toBeDelivered: messagesOverview[0].toBeDelivered,
                        waiting: messagesOverview[0].waiting,
                    }
                )
            )).toBe(undefined);
        });
    });
});