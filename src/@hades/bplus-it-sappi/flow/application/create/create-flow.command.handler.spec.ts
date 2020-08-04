import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateFlowCommandHandler } from './create-flow.command-handler';
import { flows } from '@hades/bplus-it-sappi/flow/infrastructure/seeds/flow.seed';
import { CreateFlowCommand } from './create-flow.command';
import { CreateFlowService } from './create-flow.service';

describe('CreateFlowCommandHandler', () => 
{
    let commandHandler: CreateFlowCommandHandler;
    let service: CreateFlowService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateFlowCommandHandler,
                {
                    provide: CreateFlowService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateFlowCommandHandler>(CreateFlowCommandHandler);
        service         = module.get<CreateFlowService>(CreateFlowService);
    });

    describe('main', () => 
    {
        test('CreateFlowCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateFlowService', async () => 
        {
            expect(await commandHandler.execute(
                new CreateFlowCommand(
                    flows[0].id,
                    flows[0].hash,
                    flows[0].tenantId,
                    flows[0].tenantCode,
                    flows[0].systemId,
                    flows[0].systemName,
                    flows[0].version,
                    flows[0].scenario,
                    flows[0].party,
                    flows[0].component,
                    flows[0].interfaceName,
                    flows[0].interfaceNamespace,
                    flows[0].iflowName,
                    flows[0].responsibleUserAccount,
                    flows[0].lastChangeUserAccount,
                    flows[0].lastChangedAt,
                    flows[0].folderPath,
                    flows[0].description,
                    flows[0].application,
                    flows[0].isCritical,
                    flows[0].isComplex,
                    flows[0].fieldGroupId,
                    flows[0].data,
                    
                )
            )).toBe(undefined);
        });
    });
});