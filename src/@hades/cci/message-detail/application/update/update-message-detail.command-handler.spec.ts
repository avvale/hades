import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { messagesDetail } from '@hades/cci/message-detail/infrastructure/seeds/message-detail.seed';
import { UpdateMessageDetailCommandHandler } from './update-message-detail.command-handler';
import { UpdateMessageDetailCommand } from './update-message-detail.command';
import { UpdateMessageDetailService } from './update-message-detail.service';

describe('UpdateMessageDetailCommandHandler', () =>
{
    let commandHandler: UpdateMessageDetailCommandHandler;
    let service: UpdateMessageDetailService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateMessageDetailCommandHandler,
                {
                    provide: UpdateMessageDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateMessageDetailCommandHandler>(UpdateMessageDetailCommandHandler);
        service         = module.get<UpdateMessageDetailService>(UpdateMessageDetailService);
    });

    describe('main', () =>
    {
        test('UpdateMessageDetailCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an messageDetail created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateMessageDetailCommand(
                    {
                        id: messagesDetail[0].id,
                        tenantId: messagesDetail[0].tenantId,
                        tenantCode: messagesDetail[0].tenantCode,
                        systemId: messagesDetail[0].systemId,
                        systemName: messagesDetail[0].systemName,
                        scenario: messagesDetail[0].scenario,
                        executionId: messagesDetail[0].executionId,
                        executionType: messagesDetail[0].executionType,
                        executionExecutedAt: messagesDetail[0].executionExecutedAt,
                        executionMonitoringStartAt: messagesDetail[0].executionMonitoringStartAt,
                        executionMonitoringEndAt: messagesDetail[0].executionMonitoringEndAt,
                        flowHash: messagesDetail[0].flowHash,
                        flowParty: messagesDetail[0].flowParty,
                        flowReceiverParty: messagesDetail[0].flowReceiverParty,
                        flowComponent: messagesDetail[0].flowComponent,
                        flowReceiverComponent: messagesDetail[0].flowReceiverComponent,
                        flowInterfaceName: messagesDetail[0].flowInterfaceName,
                        flowInterfaceNamespace: messagesDetail[0].flowInterfaceNamespace,
                        status: messagesDetail[0].status,
                        refMessageId: messagesDetail[0].refMessageId,
                        detail: messagesDetail[0].detail,
                        example: messagesDetail[0].example,
                        startTimeAt: messagesDetail[0].startTimeAt,
                        direction: messagesDetail[0].direction,
                        errorCategory: messagesDetail[0].errorCategory,
                        errorCode: messagesDetail[0].errorCode,
                        errorLabel: messagesDetail[0].errorLabel,
                        node: messagesDetail[0].node,
                        protocol: messagesDetail[0].protocol,
                        qualityOfService: messagesDetail[0].qualityOfService,
                        receiverParty: messagesDetail[0].receiverParty,
                        receiverComponent: messagesDetail[0].receiverComponent,
                        receiverInterface: messagesDetail[0].receiverInterface,
                        receiverInterfaceNamespace: messagesDetail[0].receiverInterfaceNamespace,
                        retries: messagesDetail[0].retries,
                        size: messagesDetail[0].size,
                        timesFailed: messagesDetail[0].timesFailed,
                        numberMax: messagesDetail[0].numberMax,
                        numberDays: messagesDetail[0].numberDays,
                    }
                )
            )).toBe(undefined);
        });
    });
});