import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateMessageDetailCommandHandler } from './update-message-detail.command-handler';
import { messagesDetail } from '@hades/bplus-it-sappi/message-detail/infrastructure/seeds/message-detail.seed';
import { UpdateMessageDetailCommand } from './update-message-detail.command';
import { UpdateMessageDetailService } from './update-message-detail.service';

describe('UpdateMessageDetailCommandHandler', () => 
{
    let commandHandler: UpdateMessageDetailCommandHandler;
    let service: UpdateMessageDetailService;

    beforeEach(async () => 
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
                    messagesDetail[0].flowId,
                    messagesDetail[0].flowParty,
                    messagesDetail[0].flowComponent,
                    messagesDetail[0].flowInterfaceName,
                    messagesDetail[0].flowInterfaceNamespace,
                    messagesDetail[0].status,
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
                    
                )
            )).toBe(undefined);
        });
    });
});