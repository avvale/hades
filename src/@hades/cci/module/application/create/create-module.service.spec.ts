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
                {
                    id: new ModuleId(modules[0].id),
                    tenantId: new ModuleTenantId(modules[0].tenantId),
                    tenantCode: new ModuleTenantCode(modules[0].tenantCode),
                    systemId: new ModuleSystemId(modules[0].systemId),
                    systemName: new ModuleSystemName(modules[0].systemName),
                    channelHash: new ModuleChannelHash(modules[0].channelHash),
                    channelParty: new ModuleChannelParty(modules[0].channelParty),
                    channelComponent: new ModuleChannelComponent(modules[0].channelComponent),
                    channelName: new ModuleChannelName(modules[0].channelName),
                    flowHash: new ModuleFlowHash(modules[0].flowHash),
                    flowParty: new ModuleFlowParty(modules[0].flowParty),
                    flowReceiverParty: new ModuleFlowReceiverParty(modules[0].flowReceiverParty),
                    flowComponent: new ModuleFlowComponent(modules[0].flowComponent),
                    flowReceiverComponent: new ModuleFlowReceiverComponent(modules[0].flowReceiverComponent),
                    flowInterfaceName: new ModuleFlowInterfaceName(modules[0].flowInterfaceName),
                    flowInterfaceNamespace: new ModuleFlowInterfaceNamespace(modules[0].flowInterfaceNamespace),
                    version: new ModuleVersion(modules[0].version),
                    parameterGroup: new ModuleParameterGroup(modules[0].parameterGroup),
                    name: new ModuleName(modules[0].name),
                    parameterName: new ModuleParameterName(modules[0].parameterName),
                    parameterValue: new ModuleParameterValue(modules[0].parameterValue),
                }
            )).toBe(undefined);
        });
    });
});