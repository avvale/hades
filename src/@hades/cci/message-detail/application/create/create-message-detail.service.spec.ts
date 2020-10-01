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
    MessageDetailNumberDays
    
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
                new MessageDetailId(messagesDetail[0].id),
                new MessageDetailTenantId(messagesDetail[0].tenantId),
                new MessageDetailTenantCode(messagesDetail[0].tenantCode),
                new MessageDetailSystemId(messagesDetail[0].systemId),
                new MessageDetailSystemName(messagesDetail[0].systemName),
                new MessageDetailScenario(messagesDetail[0].scenario),
                new MessageDetailExecutionId(messagesDetail[0].executionId),
                new MessageDetailExecutionType(messagesDetail[0].executionType),
                new MessageDetailExecutionExecutedAt(messagesDetail[0].executionExecutedAt),
                new MessageDetailExecutionMonitoringStartAt(messagesDetail[0].executionMonitoringStartAt),
                new MessageDetailExecutionMonitoringEndAt(messagesDetail[0].executionMonitoringEndAt),
                new MessageDetailFlowHash(messagesDetail[0].flowHash),
                new MessageDetailFlowParty(messagesDetail[0].flowParty),
                new MessageDetailFlowReceiverParty(messagesDetail[0].flowReceiverParty),
                new MessageDetailFlowComponent(messagesDetail[0].flowComponent),
                new MessageDetailFlowReceiverComponent(messagesDetail[0].flowReceiverComponent),
                new MessageDetailFlowInterfaceName(messagesDetail[0].flowInterfaceName),
                new MessageDetailFlowInterfaceNamespace(messagesDetail[0].flowInterfaceNamespace),
                new MessageDetailStatus(messagesDetail[0].status),
                new MessageDetailRefMessageId(messagesDetail[0].refMessageId),
                new MessageDetailDetail(messagesDetail[0].detail),
                new MessageDetailExample(messagesDetail[0].example),
                new MessageDetailStartTimeAt(messagesDetail[0].startTimeAt),
                new MessageDetailDirection(messagesDetail[0].direction),
                new MessageDetailErrorCategory(messagesDetail[0].errorCategory),
                new MessageDetailErrorCode(messagesDetail[0].errorCode),
                new MessageDetailErrorLabel(messagesDetail[0].errorLabel),
                new MessageDetailNode(messagesDetail[0].node),
                new MessageDetailProtocol(messagesDetail[0].protocol),
                new MessageDetailQualityOfService(messagesDetail[0].qualityOfService),
                new MessageDetailReceiverParty(messagesDetail[0].receiverParty),
                new MessageDetailReceiverComponent(messagesDetail[0].receiverComponent),
                new MessageDetailReceiverInterface(messagesDetail[0].receiverInterface),
                new MessageDetailReceiverInterfaceNamespace(messagesDetail[0].receiverInterfaceNamespace),
                new MessageDetailRetries(messagesDetail[0].retries),
                new MessageDetailSize(messagesDetail[0].size),
                new MessageDetailTimesFailed(messagesDetail[0].timesFailed),
                new MessageDetailNumberMax(messagesDetail[0].numberMax),
                new MessageDetailNumberDays(messagesDetail[0].numberDays),
                
            )).toBe(undefined);
        });
    });
});