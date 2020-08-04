import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateModuleCommandHandler } from './update-module.command-handler';
import { modules } from '@hades/bplus-it-sappi/module/infrastructure/seeds/module.seed';
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
                    modules[0].id,
                    modules[0].tenantId,
                    modules[0].tenantCode,
                    modules[0].systemId,
                    modules[0].systemName,
                    modules[0].channelId,
                    modules[0].channelParty,
                    modules[0].channelComponent,
                    modules[0].channelName,
                    modules[0].flowHash,
                    modules[0].flowParty,
                    modules[0].flowComponent,
                    modules[0].flowInterfaceName,
                    modules[0].flowInterfaceNamespace,
                    modules[0].version,
                    modules[0].parameterGroup,
                    modules[0].name,
                    modules[0].parameterName,
                    modules[0].parameterValue,
                    
                )
            )).toBe(undefined);
        });
    });
});