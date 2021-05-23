import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { modules } from '@hades/cci/module/infrastructure/seeds/module.seed';
import { UpdateModuleCommandHandler } from './update-module.command-handler';
import { UpdateModuleCommand } from './update-module.command';
import { UpdateModuleService } from './update-module.service';

describe('UpdateModuleCommandHandler', () =>
{
    let commandHandler: UpdateModuleCommandHandler;
    let service: UpdateModuleService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateModuleCommandHandler,
                {
                    provide: UpdateModuleService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateModuleCommandHandler>(UpdateModuleCommandHandler);
        service         = module.get<UpdateModuleService>(UpdateModuleService);
    });

    describe('main', () =>
    {
        test('UpdateModuleCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an module created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateModuleCommand(
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