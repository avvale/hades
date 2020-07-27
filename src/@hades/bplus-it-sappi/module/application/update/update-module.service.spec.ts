import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { modules } from '@hades/bplus-it-sappi/module/infrastructure/seeds/module.seed';
import { UpdateModuleService } from './update-module.service';
import { 
    ModuleId, 
    ModuleTenantId, 
    ModuleTenantCode, 
    ModuleSystemId, 
    ModuleSystemName, 
    ModuleChannelId, 
    ModuleChannelParty, 
    ModuleChannelComponent, 
    ModuleChannelName, 
    ModuleFlowId, 
    ModuleFlowParty, 
    ModuleFlowComponent, 
    ModuleFlowInterfaceName, 
    ModuleFlowInterfaceNamespace, 
    ModuleVersion, 
    ModuleParameterGroup, 
    ModuleName, 
    ModuleParameterName, 
    ModuleParameterValue, 
    ModuleCreatedAt, 
    ModuleUpdatedAt, 
    ModuleDeletedAt
    
} from './../../domain/value-objects';
import { IModuleRepository } from './../../domain/module.repository';
import { MockModuleRepository } from './../../infrastructure/mock/mock-module.repository';

describe('UpdateModuleService', () => 
{
    let service: UpdateModuleService;
    let repository: IModuleRepository;
    let mockRepository: MockModuleRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateModuleService,
                MockModuleRepository,
                { 
                    provide: IModuleRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateModuleService);
        repository      = module.get(IModuleRepository);
        mockRepository  = module.get(MockModuleRepository);
    });

    describe('main', () => 
    {
        test('UpdateModuleService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should update a module and emit event', async () => 
        {
            expect(await service.main(
                new ModuleId(modules[0].id),
                new ModuleTenantId(modules[0].tenantId),
                new ModuleTenantCode(modules[0].tenantCode),
                new ModuleSystemId(modules[0].systemId),
                new ModuleSystemName(modules[0].systemName),
                new ModuleChannelId(modules[0].channelId),
                new ModuleChannelParty(modules[0].channelParty),
                new ModuleChannelComponent(modules[0].channelComponent),
                new ModuleChannelName(modules[0].channelName),
                new ModuleFlowId(modules[0].flowId),
                new ModuleFlowParty(modules[0].flowParty),
                new ModuleFlowComponent(modules[0].flowComponent),
                new ModuleFlowInterfaceName(modules[0].flowInterfaceName),
                new ModuleFlowInterfaceNamespace(modules[0].flowInterfaceNamespace),
                new ModuleVersion(modules[0].version),
                new ModuleParameterGroup(modules[0].parameterGroup),
                new ModuleName(modules[0].name),
                new ModuleParameterName(modules[0].parameterName),
                new ModuleParameterValue(modules[0].parameterValue),
                
            )).toBe(undefined);
        });
    });
});