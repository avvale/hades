import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { modules } from '@hades/cci/module/infrastructure/seeds/module.seed';
import { CreateModuleService } from './create-module.service';
import {
    ModuleId,
    ModuleTenantId,
    ModuleTenantCode,
    ModuleSystemId,
    ModuleSystemName,
    ModuleChannelHash,
    ModuleChannelParty,
    ModuleChannelComponent,
    ModuleChannelName,
    ModuleFlowHash,
    ModuleFlowParty,
    ModuleFlowReceiverParty,
    ModuleFlowComponent,
    ModuleFlowReceiverComponent,
    ModuleFlowInterfaceName,
    ModuleFlowInterfaceNamespace,
    ModuleVersion,
    ModuleParameterGroup,
    ModuleName,
    ModuleParameterName,
    ModuleParameterValue,
    ModuleCreatedAt,
    ModuleUpdatedAt,
    ModuleDeletedAt,
} from './../../domain/value-objects';
import { IModuleRepository } from './../../domain/module.repository';
import { MockModuleRepository } from './../../infrastructure/mock/mock-module.repository';

describe('CreateModuleService', () =>

{
    let service: CreateModuleService;
    let repository: IModuleRepository;
    let mockRepository: MockModuleRepository;

    beforeAll(async () =>
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
                        create: (item) => {}
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
            expect(await service.main(
                new ModuleId(modules[0].id),
                new ModuleTenantId(modules[0].tenantId),
                new ModuleTenantCode(modules[0].tenantCode),
                new ModuleSystemId(modules[0].systemId),
                new ModuleSystemName(modules[0].systemName),
                new ModuleChannelHash(modules[0].channelHash),
                new ModuleChannelParty(modules[0].channelParty),
                new ModuleChannelComponent(modules[0].channelComponent),
                new ModuleChannelName(modules[0].channelName),
                new ModuleFlowHash(modules[0].flowHash),
                new ModuleFlowParty(modules[0].flowParty),
                new ModuleFlowReceiverParty(modules[0].flowReceiverParty),
                new ModuleFlowComponent(modules[0].flowComponent),
                new ModuleFlowReceiverComponent(modules[0].flowReceiverComponent),
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