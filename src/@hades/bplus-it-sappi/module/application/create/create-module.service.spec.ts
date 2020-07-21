import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { modules } from '@hades/bplus-it-sappi/module/infrastructure/seeds/module.seed';
import { CreateModuleService } from './create-module.service';
import { 
    ModuleId, 
    ModuleTenantId, 
    ModuleSystemId, 
    ModuleSystemName, 
    ModuleChannelId, 
    ModuleChannelParty, 
    ModuleChannelComponent, 
    ModuleChannelName, 
    ModuleFlowParty, 
    ModuleFlowComponent, 
    ModuleFlowInterfaceName, 
    ModuleFlowInterfaceNamespace, 
    ModuleParameterGroup, 
    ModuleName, 
    ModuleParameterName, 
    ModuleParameterValue
    
} from './../../domain/value-objects';
import { IModuleRepository } from '../../domain/module.repository';
import { MockModuleRepository } from '../../infrastructure/mock/mock-module.repository';

describe('CreateModuleService', () => 
{
    let service: CreateModuleService;
    let repository: IModuleRepository;
    let mockRepository: MockModuleRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateModuleService,
                MockModuleRepository,
                { 
                    provide: IModuleRepository,
                    useValue: {
                        create: (item) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateModuleService);
        repository      = module.get(IModuleRepository);
        mockRepository  = module.get(MockModuleRepository);
    });

    describe('main', () => 
    {
        test('CreateModuleService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a module and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ModuleId(modules[0].id),
                new ModuleTenantId(modules[0].tenantId),
                new ModuleSystemId(modules[0].systemId),
                new ModuleSystemName(modules[0].systemName),
                new ModuleChannelId(modules[0].channelId),
                new ModuleChannelParty(modules[0].channelParty),
                new ModuleChannelComponent(modules[0].channelComponent),
                new ModuleChannelName(modules[0].channelName),
                new ModuleFlowParty(modules[0].flowParty),
                new ModuleFlowComponent(modules[0].flowComponent),
                new ModuleFlowInterfaceName(modules[0].flowInterfaceName),
                new ModuleFlowInterfaceNamespace(modules[0].flowInterfaceNamespace),
                new ModuleParameterGroup(modules[0].parameterGroup),
                new ModuleName(modules[0].name),
                new ModuleParameterName(modules[0].parameterName),
                new ModuleParameterValue(modules[0].parameterValue),
                
            )).toBe(undefined);
        });
    });
});