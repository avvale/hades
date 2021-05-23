import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
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
import { CciModule } from './../../domain/module.aggregate';
import { modules } from './../seeds/module.seed';

@Injectable()
export class MockModuleSeeder extends MockSeeder<CciModule>
{
    public collectionSource: CciModule[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let module of modules)
        {
            this.collectionSource.push(
                CciModule.register(
                    new ModuleId(module.id),
                    new ModuleTenantId(module.tenantId),
                    new ModuleTenantCode(module.tenantCode),
                    new ModuleSystemId(module.systemId),
                    new ModuleSystemName(module.systemName),
                    new ModuleChannelHash(module.channelHash),
                    new ModuleChannelParty(module.channelParty),
                    new ModuleChannelComponent(module.channelComponent),
                    new ModuleChannelName(module.channelName),
                    new ModuleFlowHash(module.flowHash),
                    new ModuleFlowParty(module.flowParty),
                    new ModuleFlowReceiverParty(module.flowReceiverParty),
                    new ModuleFlowComponent(module.flowComponent),
                    new ModuleFlowReceiverComponent(module.flowReceiverComponent),
                    new ModuleFlowInterfaceName(module.flowInterfaceName),
                    new ModuleFlowInterfaceNamespace(module.flowInterfaceNamespace),
                    new ModuleVersion(module.version),
                    new ModuleParameterGroup(module.parameterGroup),
                    new ModuleName(module.name),
                    new ModuleParameterName(module.parameterName),
                    new ModuleParameterValue(module.parameterValue),
                    new ModuleCreatedAt({currentTimestamp: true}),
                    new ModuleUpdatedAt({currentTimestamp: true}),
                    new ModuleDeletedAt(null),
                )
            );
        }
    }
}