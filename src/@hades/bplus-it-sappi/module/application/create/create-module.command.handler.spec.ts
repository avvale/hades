import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateModuleCommandHandler } from './create-module.command-handler';
import { modules } from '@hades/bplus-it-sappi/module/infrastructure/seeds/module.seed';
import { CreateModuleCommand } from './create-module.command';
import { CreateModuleService } from './create-module.service';

describe('CreateModuleCommandHandler', () => 
{
    let commandHandler: CreateModuleCommandHandler;
    let service: CreateModuleService;

    beforeEach(async () => 
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
                    modules[0].id,
                    modules[0].tenantId,
                    modules[0].tenantCode,
                    modules[0].systemId,
                    modules[0].systemName,
                    modules[0].channelId,
                    modules[0].channelParty,
                    modules[0].channelComponent,
                    modules[0].channelName,
                    modules[0].flowId,
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