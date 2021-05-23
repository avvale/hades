import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { messagesDetail } from '@hades/cci/message-detail/infrastructure/seeds/message-detail.seed';
import { CreateMessageDetailService } from './create-message-detail.service';
import {
    MessageDetailId,
    MessageDetailTenantId,
    MessageDetailTenantCode,
    MessageDetailSystemId,
    MessageDetailSystemName,
    MessageDetailScenario,
    MessageDetailExecutionId,
    MessageDetailExecutionType,
    MessageDetailExecutionExecutedAt,
    MessageDetailExecutionMonitoringStartAt,
    MessageDetailExecutionMonitoringEndAt,
    MessageDetailFlowHash,
    MessageDetailFlowParty,
    MessageDetailFlowReceiverParty,
    MessageDetailFlowComponent,
    MessageDetailFlowReceiverComponent,
    MessageDetailFlowInterfaceName,
    MessageDetailFlowInterfaceNamespace,
    MessageDetailStatus,
    MessageDetailRefMessageId,
    MessageDetailDetail,
    MessageDetailExample,
    MessageDetailStartTimeAt,
    MessageDetailDirection,
    MessageDetailErrorCategory,
    MessageDetailErrorCode,
    MessageDetailErrorLabel,
    MessageDetailNode,
    MessageDetailProtocol,
    MessageDetailQualityOfService,
    MessageDetailReceiverParty,
    MessageDetailReceiverComponent,
    MessageDetailReceiverInterface,
    MessageDetailReceiverInterfaceNamespace,
    MessageDetailRetries,
    MessageDetailSize,
    MessageDetailTimesFailed,
    MessageDetailNumberMax,
    MessageDetailNumberDays,
    MessageDetailCreatedAt,
    MessageDetailUpdatedAt,
    MessageDetailDeletedAt,
} from './../../domain/value-objects';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { MockMessageDetailRepository } from './../../infrastructure/mock/mock-message-detail.repository';

describe('CreateMessageDetailService', () =>

{
    let service: CreateMessageDetailService;
    let repository: IMessageDetailRepository;
    let mockRepository: MockMessageDetailRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateMessageDetailService,
                MockMessageDetailRepository,
                {
                    provide: IMessageDetailRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateMessageDetailService);
        repository      = module.get(IMessageDetailRepository);
        mockRepository  = module.get(MockMessageDetailRepository);
    });

    describe('main', () =>
    {
        test('CreateMessageDetailService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a messageDetail and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new MessageDetailId(messagesDetail[0].id),
                    tenantId: new MessageDetailTenantId(messagesDetail[0].tenantId),
                    tenantCode: new MessageDetailTenantCode(messagesDetail[0].tenantCode),
                    systemId: new MessageDetailSystemId(messagesDetail[0].systemId),
                    systemName: new MessageDetailSystemName(messagesDetail[0].systemName),
                    scenario: new MessageDetailScenario(messagesDetail[0].scenario),
                    executionId: new MessageDetailExecutionId(messagesDetail[0].executionId),
                    executionType: new MessageDetailExecutionType(messagesDetail[0].executionType),
                    executionExecutedAt: new MessageDetailExecutionExecutedAt(messagesDetail[0].executionExecutedAt),
                    executionMonitoringStartAt: new MessageDetailExecutionMonitoringStartAt(messagesDetail[0].executionMonitoringStartAt),
                    executionMonitoringEndAt: new MessageDetailExecutionMonitoringEndAt(messagesDetail[0].executionMonitoringEndAt),
                    flowHash: new MessageDetailFlowHash(messagesDetail[0].flowHash),
                    flowParty: new MessageDetailFlowParty(messagesDetail[0].flowParty),
                    flowReceiverParty: new MessageDetailFlowReceiverParty(messagesDetail[0].flowReceiverParty),
                    flowComponent: new MessageDetailFlowComponent(messagesDetail[0].flowComponent),
                    flowReceiverComponent: new MessageDetailFlowReceiverComponent(messagesDetail[0].flowReceiverComponent),
                    flowInterfaceName: new MessageDetailFlowInterfaceName(messagesDetail[0].flowInterfaceName),
                    flowInterfaceNamespace: new MessageDetailFlowInterfaceNamespace(messagesDetail[0].flowInterfaceNamespace),
                    status: new MessageDetailStatus(messagesDetail[0].status),
                    refMessageId: new MessageDetailRefMessageId(messagesDetail[0].refMessageId),
                    detail: new MessageDetailDetail(messagesDetail[0].detail),
                    example: new MessageDetailExample(messagesDetail[0].example),
                    startTimeAt: new MessageDetailStartTimeAt(messagesDetail[0].startTimeAt),
                    direction: new MessageDetailDirection(messagesDetail[0].direction),
                    errorCategory: new MessageDetailErrorCategory(messagesDetail[0].errorCategory),
                    errorCode: new MessageDetailErrorCode(messagesDetail[0].errorCode),
                    errorLabel: new MessageDetailErrorLabel(messagesDetail[0].errorLabel),
                    node: new MessageDetailNode(messagesDetail[0].node),
                    protocol: new MessageDetailProtocol(messagesDetail[0].protocol),
                    qualityOfService: new MessageDetailQualityOfService(messagesDetail[0].qualityOfService),
                    receiverParty: new MessageDetailReceiverParty(messagesDetail[0].receiverParty),
                    receiverComponent: new MessageDetailReceiverComponent(messagesDetail[0].receiverComponent),
                    receiverInterface: new MessageDetailReceiverInterface(messagesDetail[0].receiverInterface),
                    receiverInterfaceNamespace: new MessageDetailReceiverInterfaceNamespace(messagesDetail[0].receiverInterfaceNamespace),
                    retries: new MessageDetailRetries(messagesDetail[0].retries),
                    size: new MessageDetailSize(messagesDetail[0].size),
                    timesFailed: new MessageDetailTimesFailed(messagesDetail[0].timesFailed),
                    numberMax: new MessageDetailNumberMax(messagesDetail[0].numberMax),
                    numberDays: new MessageDetailNumberDays(messagesDetail[0].numberDays),
                }
            )).toBe(undefined);
        });
    });
});