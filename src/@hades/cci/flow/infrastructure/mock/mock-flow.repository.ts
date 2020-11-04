import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IFlowRepository } from '@hades/cci/flow/domain/flow.repository';
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
} from '@hades/cci/flow/domain/value-objects';
import { CciFlow } from './../../domain/flow.aggregate';
import { flows } from './../seeds/flow.seed';

@Injectable()
export class MockFlowRepository extends MockRepository<CciFlow> implements IFlowRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CciFlow';
    public collectionSource: CciFlow[];
    public deletedAtInstance: FlowDeletedAt = new FlowDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset()
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>flows)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CciFlow.register(
                    new FlowId(itemCollection.id),
                    new FlowHash(itemCollection.hash),
                    new FlowTenantId(itemCollection.tenantId),
                    new FlowTenantCode(itemCollection.tenantCode),
                    new FlowSystemId(itemCollection.systemId),
                    new FlowSystemName(itemCollection.systemName),
                    new FlowVersion(itemCollection.version),
                    new FlowScenario(itemCollection.scenario),
                    new FlowParty(itemCollection.party),
                    new FlowReceiverParty(itemCollection.receiverParty),
                    new FlowComponent(itemCollection.component),
                    new FlowReceiverComponent(itemCollection.receiverComponent),
                    new FlowInterfaceName(itemCollection.interfaceName),
                    new FlowInterfaceNamespace(itemCollection.interfaceNamespace),
                    new FlowIflowName(itemCollection.iflowName),
                    new FlowResponsibleUserAccount(itemCollection.responsibleUserAccount),
                    new FlowLastChangeUserAccount(itemCollection.lastChangeUserAccount),
                    new FlowLastChangedAt(itemCollection.lastChangedAt),
                    new FlowFolderPath(itemCollection.folderPath),
                    new FlowDescription(itemCollection.description),
                    new FlowApplication(itemCollection.application),
                    new FlowIsCritical(itemCollection.isCritical),
                    new FlowIsComplex(itemCollection.isComplex),
                    new FlowFieldGroupId(itemCollection.fieldGroupId),
                    new FlowData(itemCollection.data),
                    new FlowCreatedAt(itemCollection.createdAt),
                    new FlowUpdatedAt(itemCollection.updatedAt),
                    new FlowDeletedAt(itemCollection.deletedAt),
                    
                ));
        }
    }
}