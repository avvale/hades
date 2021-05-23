import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
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
import { CciFlow } from './../../domain/flow.aggregate';
import { flows } from './../seeds/flow.seed';

@Injectable()
export class MockFlowSeeder extends MockSeeder<CciFlow>
{
    public collectionSource: CciFlow[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let flow of flows)
        {
            this.collectionSource.push(
                CciFlow.register(
                    new FlowId(flow.id),
                    new FlowHash(flow.hash),
                    new FlowTenantId(flow.tenantId),
                    new FlowTenantCode(flow.tenantCode),
                    new FlowSystemId(flow.systemId),
                    new FlowSystemName(flow.systemName),
                    new FlowVersion(flow.version),
                    new FlowScenario(flow.scenario),
                    new FlowParty(flow.party),
                    new FlowReceiverParty(flow.receiverParty),
                    new FlowComponent(flow.component),
                    new FlowReceiverComponent(flow.receiverComponent),
                    new FlowInterfaceName(flow.interfaceName),
                    new FlowInterfaceNamespace(flow.interfaceNamespace),
                    new FlowIflowName(flow.iflowName),
                    new FlowResponsibleUserAccount(flow.responsibleUserAccount),
                    new FlowLastChangeUserAccount(flow.lastChangeUserAccount),
                    new FlowLastChangedAt(flow.lastChangedAt),
                    new FlowFolderPath(flow.folderPath),
                    new FlowDescription(flow.description),
                    new FlowApplication(flow.application),
                    new FlowIsCritical(flow.isCritical),
                    new FlowIsComplex(flow.isComplex),
                    new FlowFieldGroupId(flow.fieldGroupId),
                    new FlowData(flow.data),
                    new FlowCreatedAt({currentTimestamp: true}),
                    new FlowUpdatedAt({currentTimestamp: true}),
                    new FlowDeletedAt(null),
                )
            );
        }
    }
}