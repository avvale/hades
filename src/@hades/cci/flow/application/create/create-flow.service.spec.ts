import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { flows } from '@hades/cci/flow/infrastructure/seeds/flow.seed';
import { CreateFlowService } from './create-flow.service';
import {
    FlowId,
    FlowHash,
    FlowTenantId,
    FlowTenantCode,
    FlowSystemId,
    FlowSystemName,
    FlowVersion,
    FlowScenario,
    FlowParty,
    FlowReceiverParty,
    FlowComponent,
    FlowReceiverComponent,
    FlowInterfaceName,
    FlowInterfaceNamespace,
    FlowIflowName,
    FlowResponsibleUserAccount,
    FlowLastChangeUserAccount,
    FlowLastChangedAt,
    FlowFolderPath,
    FlowDescription,
    FlowApplication,
    FlowIsCritical,
    FlowIsComplex,
    FlowFieldGroupId,
    FlowData,
    FlowCreatedAt,
    FlowUpdatedAt,
    FlowDeletedAt,
} from './../../domain/value-objects';
import { IFlowRepository } from './../../domain/flow.repository';
import { MockFlowRepository } from './../../infrastructure/mock/mock-flow.repository';

describe('CreateFlowService', () =>

{
    let service: CreateFlowService;
    let repository: IFlowRepository;
    let mockRepository: MockFlowRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateFlowService,
                MockFlowRepository,
                {
                    provide: IFlowRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateFlowService);
        repository      = module.get(IFlowRepository);
        mockRepository  = module.get(MockFlowRepository);
    });

    describe('main', () =>
    {
        test('CreateFlowService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a flow and emit event', async () =>
        {
            expect(await service.main(
                new FlowId(flows[0].id),
                new FlowHash(flows[0].hash),
                new FlowTenantId(flows[0].tenantId),
                new FlowTenantCode(flows[0].tenantCode),
                new FlowSystemId(flows[0].systemId),
                new FlowSystemName(flows[0].systemName),
                new FlowVersion(flows[0].version),
                new FlowScenario(flows[0].scenario),
                new FlowParty(flows[0].party),
                new FlowReceiverParty(flows[0].receiverParty),
                new FlowComponent(flows[0].component),
                new FlowReceiverComponent(flows[0].receiverComponent),
                new FlowInterfaceName(flows[0].interfaceName),
                new FlowInterfaceNamespace(flows[0].interfaceNamespace),
                new FlowIflowName(flows[0].iflowName),
                new FlowResponsibleUserAccount(flows[0].responsibleUserAccount),
                new FlowLastChangeUserAccount(flows[0].lastChangeUserAccount),
                new FlowLastChangedAt(flows[0].lastChangedAt),
                new FlowFolderPath(flows[0].folderPath),
                new FlowDescription(flows[0].description),
                new FlowApplication(flows[0].application),
                new FlowIsCritical(flows[0].isCritical),
                new FlowIsComplex(flows[0].isComplex),
                new FlowFieldGroupId(flows[0].fieldGroupId),
                new FlowData(flows[0].data),
            )).toBe(undefined);
        });
    });
});