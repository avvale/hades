import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IModuleRepository } from '@hades/cci/module/domain/module.repository';
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
    ModuleDeletedAt
    
} from '@hades/cci/module/domain/value-objects';
import { CciModule } from './../../domain/module.aggregate';
import { modules } from './../seeds/module.seed';

@Injectable()
export class MockModuleRepository extends MockRepository<CciModule> implements IModuleRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CciModule';
    public collectionSource: CciModule[];
    public deletedAtInstance: ModuleDeletedAt = new ModuleDeletedAt(null);
    
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

        for (const itemCollection of <any[]>modules)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(CciModule.register(
                    new ModuleId(itemCollection.id),
                    new ModuleTenantId(itemCollection.tenantId),
                    new ModuleTenantCode(itemCollection.tenantCode),
                    new ModuleSystemId(itemCollection.systemId),
                    new ModuleSystemName(itemCollection.systemName),
                    new ModuleChannelHash(itemCollection.channelHash),
                    new ModuleChannelParty(itemCollection.channelParty),
                    new ModuleChannelComponent(itemCollection.channelComponent),
                    new ModuleChannelName(itemCollection.channelName),
                    new ModuleFlowHash(itemCollection.flowHash),
                    new ModuleFlowParty(itemCollection.flowParty),
                    new ModuleFlowReceiverParty(itemCollection.flowReceiverParty),
                    new ModuleFlowComponent(itemCollection.flowComponent),
                    new ModuleFlowReceiverComponent(itemCollection.flowReceiverComponent),
                    new ModuleFlowInterfaceName(itemCollection.flowInterfaceName),
                    new ModuleFlowInterfaceNamespace(itemCollection.flowInterfaceNamespace),
                    new ModuleVersion(itemCollection.version),
                    new ModuleParameterGroup(itemCollection.parameterGroup),
                    new ModuleName(itemCollection.name),
                    new ModuleParameterName(itemCollection.parameterName),
                    new ModuleParameterValue(itemCollection.parameterValue),
                    new ModuleCreatedAt(itemCollection.createdAt),
                    new ModuleUpdatedAt(itemCollection.updatedAt),
                    new ModuleDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }
}