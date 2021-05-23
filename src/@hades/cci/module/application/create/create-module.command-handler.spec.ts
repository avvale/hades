import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { modules } from '@hades/cci/module/infrastructure/seeds/module.seed';
import { CreateModuleCommandHandler } from './create-module.command-handler';
import { CreateModuleCommand } from './create-module.command';
import { CreateModuleService } from './create-module.service';

describe('CreateModuleCommandHandler', () =>
{
    let commandHandler: CreateModuleCommandHandler;
    let service: CreateModuleService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateModuleCommandHandler,
                {
                    provide: CreateModuleService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateModuleCommandHandler>(CreateModuleCommandHandler);
        service         = module.get<CreateModuleService>(CreateModuleService);
    });

    describe('main', () =>
    {
        test('CreateModuleCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateModuleService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateModuleCommand(
                    {
                        id: modules[0].id,
                        tenantId: modules[0].tenantId,
                        tenantCode: modules[0].tenantCode,
                        systemId: modules[0].systemId,
                        systemName: modules[0].systemName,
                        channelHash: modules[0].channelHash,
                        channelParty: modules[0].channelParty,
                        channelComponent: modules[0].channelComponent,
                        channelName: modules[0].channelName,
                        flowHash: modules[0].flowHash,
                        flowParty: modules[0].flowParty,
                        flowReceiverParty: modules[0].flowReceiverParty,
                        flowComponent: modules[0].flowComponent,
                        flowReceiverComponent: modules[0].flowReceiverComponent,
                        flowInterfaceName: modules[0].flowInterfaceName,
                        flowInterfaceNamespace: modules[0].flowInterfaceNamespace,
                        version: modules[0].version,
                        parameterGroup: modules[0].parameterGroup,
                        name: modules[0].name,
                        parameterName: modules[0].parameterName,
                        parameterValue: modules[0].parameterValue,
                    }
                )
            )).toBe(undefined);
        });
    });
});