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
                {
                    id: new FlowId(flows[0].id),
                    hash: new FlowHash(flows[0].hash),
                    tenantId: new FlowTenantId(flows[0].tenantId),
                    tenantCode: new FlowTenantCode(flows[0].tenantCode),
                    systemId: new FlowSystemId(flows[0].systemId),
                    systemName: new FlowSystemName(flows[0].systemName),
                    version: new FlowVersion(flows[0].version),
                    scenario: new FlowScenario(flows[0].scenario),
                    party: new FlowParty(flows[0].party),
                    receiverParty: new FlowReceiverParty(flows[0].receiverParty),
                    component: new FlowComponent(flows[0].component),
                    receiverComponent: new FlowReceiverComponent(flows[0].receiverComponent),
                    interfaceName: new FlowInterfaceName(flows[0].interfaceName),
                    interfaceNamespace: new FlowInterfaceNamespace(flows[0].interfaceNamespace),
                    iflowName: new FlowIflowName(flows[0].iflowName),
                    responsibleUserAccount: new FlowResponsibleUserAccount(flows[0].responsibleUserAccount),
                    lastChangeUserAccount: new FlowLastChangeUserAccount(flows[0].lastChangeUserAccount),
                    lastChangedAt: new FlowLastChangedAt(flows[0].lastChangedAt),
                    folderPath: new FlowFolderPath(flows[0].folderPath),
                    description: new FlowDescription(flows[0].description),
                    application: new FlowApplication(flows[0].application),
                    isCritical: new FlowIsCritical(flows[0].isCritical),
                    isComplex: new FlowIsComplex(flows[0].isComplex),
                    fieldGroupId: new FlowFieldGroupId(flows[0].fieldGroupId),
                    data: new FlowData(flows[0].data),
                }
            )).toBe(undefined);
        });
    });
});