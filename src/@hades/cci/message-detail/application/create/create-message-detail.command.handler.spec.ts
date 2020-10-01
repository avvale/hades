import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateMessageDetailCommandHandler } from './create-message-detail.command-handler';
import { messagesDetail } from '@hades/cci/message-detail/infrastructure/seeds/message-detail.seed';
import { CreateMessageDetailCommand } from './create-message-detail.command';
import { CreateMessageDetailService } from './create-message-detail.service';

describe('CreateMessageDetailCommandHandler', () => 
{
    let commandHandler: CreateMessageDetailCommandHandler;
    let service: CreateMessageDetailService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateMessageDetailCommandHandler,
                {
                    provide: CreateMessageDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateMessageDetailCommandHandler>(CreateMessageDetailCommandHandler);
        service         = module.get<CreateMessageDetailService>(CreateMessageDetailService);
    });

    describe('main', () => 
    {
        test('CreateMessageDetailCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateMessageDetailService', async () => 
        {
            expect(await commandHandler.execute(
                new CreateMessageDetailCommand(
                    messagesDetail[0].id,
                    messagesDetail[0].tenantId,
                    messagesDetail[0].tenantCode,
                    messagesDetail[0].systemId,
                    messagesDetail[0].systemName,
                    messagesDetail[0].scenario,
                    messagesDetail[0].executionId,
                    messagesDetail[0].executionType,
                    messagesDetail[0].executionExecutedAt,
                    messagesDetail[0].executionMonitoringStartAt,
                    messagesDetail[0].executionMonitoringEndAt,
                    messagesDetail[0].flowHash,
                    messagesDetail[0].flowParty,
                    messagesDetail[0].flowReceiverParty,
                    messagesDetail[0].flowComponent,
                    messagesDetail[0].flowReceiverComponent,
                    messagesDetail[0].flowInterfaceName,
                    messagesDetail[0].flowInterfaceNamespace,
                    messagesDetail[0].status,
                    messagesDetail[0].refMessageId,
                    messagesDetail[0].detail,
                    messagesDetail[0].example,
                    messagesDetail[0].startTimeAt,
                    messagesDetail[0].direction,
                    messagesDetail[0].errorCategory,
                    messagesDetail[0].errorCode,
                    messagesDetail[0].errorLabel,
                    messagesDetail[0].node,
                    messagesDetail[0].protocol,
                    messagesDetail[0].qualityOfService,
                    messagesDetail[0].receiverParty,
                    messagesDetail[0].receiverComponent,
                    messagesDetail[0].receiverInterface,
                    messagesDetail[0].receiverInterfaceNamespace,
                    messagesDetail[0].retries,
                    messagesDetail[0].size,
                    messagesDetail[0].timesFailed,
                    messagesDetail[0].numberMax,
                    messagesDetail[0].numberDays,
                    
                )
            )).toBe(undefined);
        });
    });
});