import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';
import { CreateMessageOverviewService } from './create-message-overview.service';
import {
    MessageOverviewId,
    MessageOverviewTenantId,
    MessageOverviewTenantCode,
    MessageOverviewSystemId,
    MessageOverviewSystemName,
    MessageOverviewExecutionId,
    MessageOverviewExecutionType,
    MessageOverviewExecutionExecutedAt,
    MessageOverviewExecutionMonitoringStartAt,
    MessageOverviewExecutionMonitoringEndAt,
    MessageOverviewNumberMax,
    MessageOverviewNumberDays,
    MessageOverviewSuccess,
    MessageOverviewCancelled,
    MessageOverviewDelivering,
    MessageOverviewError,
    MessageOverviewHolding,
    MessageOverviewToBeDelivered,
    MessageOverviewWaiting,
    MessageOverviewCreatedAt,
    MessageOverviewUpdatedAt,
    MessageOverviewDeletedAt,
} from './../../domain/value-objects';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { MockMessageOverviewRepository } from './../../infrastructure/mock/mock-message-overview.repository';

describe('CreateMessageOverviewService', () =>

{
    let service: CreateMessageOverviewService;
    let repository: IMessageOverviewRepository;
    let mockRepository: MockMessageOverviewRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateMessageOverviewService,
                MockMessageOverviewRepository,
                {
                    provide: IMessageOverviewRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateMessageOverviewService);
        repository      = module.get(IMessageOverviewRepository);
        mockRepository  = module.get(MockMessageOverviewRepository);
    });

    describe('main', () =>
    {
        test('CreateMessageOverviewService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a messageOverview and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new MessageOverviewId(messagesOverview[0].id),
                    tenantId: new MessageOverviewTenantId(messagesOverview[0].tenantId),
                    tenantCode: new MessageOverviewTenantCode(messagesOverview[0].tenantCode),
                    systemId: new MessageOverviewSystemId(messagesOverview[0].systemId),
                    systemName: new MessageOverviewSystemName(messagesOverview[0].systemName),
                    executionId: new MessageOverviewExecutionId(messagesOverview[0].executionId),
                    executionType: new MessageOverviewExecutionType(messagesOverview[0].executionType),
                    executionExecutedAt: new MessageOverviewExecutionExecutedAt(messagesOverview[0].executionExecutedAt),
                    executionMonitoringStartAt: new MessageOverviewExecutionMonitoringStartAt(messagesOverview[0].executionMonitoringStartAt),
                    executionMonitoringEndAt: new MessageOverviewExecutionMonitoringEndAt(messagesOverview[0].executionMonitoringEndAt),
                    numberMax: new MessageOverviewNumberMax(messagesOverview[0].numberMax),
                    numberDays: new MessageOverviewNumberDays(messagesOverview[0].numberDays),
                    success: new MessageOverviewSuccess(messagesOverview[0].success),
                    cancelled: new MessageOverviewCancelled(messagesOverview[0].cancelled),
                    delivering: new MessageOverviewDelivering(messagesOverview[0].delivering),
                    error: new MessageOverviewError(messagesOverview[0].error),
                    holding: new MessageOverviewHolding(messagesOverview[0].holding),
                    toBeDelivered: new MessageOverviewToBeDelivered(messagesOverview[0].toBeDelivered),
                    waiting: new MessageOverviewWaiting(messagesOverview[0].waiting),
                }
            )).toBe(undefined);
        });
    });
});