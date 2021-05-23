import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { flows } from '@hades/cci/flow/infrastructure/seeds/flow.seed';
import { CreateFlowCommandHandler } from './create-flow.command-handler';
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
                    {
                        id: flows[0].id,
                        hash: flows[0].hash,
                        tenantId: flows[0].tenantId,
                        tenantCode: flows[0].tenantCode,
                        systemId: flows[0].systemId,
                        systemName: flows[0].systemName,
                        version: flows[0].version,
                        scenario: flows[0].scenario,
                        party: flows[0].party,
                        receiverParty: flows[0].receiverParty,
                        component: flows[0].component,
                        receiverComponent: flows[0].receiverComponent,
                        interfaceName: flows[0].interfaceName,
                        interfaceNamespace: flows[0].interfaceNamespace,
                        iflowName: flows[0].iflowName,
                        responsibleUserAccount: flows[0].responsibleUserAccount,
                        lastChangeUserAccount: flows[0].lastChangeUserAccount,
                        lastChangedAt: flows[0].lastChangedAt,
                        folderPath: flows[0].folderPath,
                        description: flows[0].description,
                        application: flows[0].application,
                        isCritical: flows[0].isCritical,
                        isComplex: flows[0].isComplex,
                        fieldGroupId: flows[0].fieldGroupId,
                        data: flows[0].data,
                    }
                )
            )).toBe(undefined);
        });
    });
});