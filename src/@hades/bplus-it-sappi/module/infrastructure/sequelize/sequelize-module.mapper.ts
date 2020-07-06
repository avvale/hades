import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiModule } from './../../domain/module.aggregate';
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
    ModuleParameterValue, 
    ModuleCreatedAt, 
    ModuleUpdatedAt, 
    ModuleDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeModuleMapper implements SequelizeMapper
{
    mapToAggregate(module: ObjectLiteral | ObjectLiteral[]): BplusItSappiModule | BplusItSappiModule[]
    {
        if (Array.isArray(module))
        {
            return module.map(item => BplusItSappiModule.register(
                    new ModuleId(item.id),
                    new ModuleTenantId(item.tenantId),
                    new ModuleSystemId(item.systemId),
                    new ModuleSystemName(item.systemName),
                    new ModuleChannelId(item.channelId),
                    new ModuleChannelParty(item.channelParty),
                    new ModuleChannelComponent(item.channelComponent),
                    new ModuleChannelName(item.channelName),
                    new ModuleFlowParty(item.flowParty),
                    new ModuleFlowComponent(item.flowComponent),
                    new ModuleFlowInterfaceName(item.flowInterfaceName),
                    new ModuleFlowInterfaceNamespace(item.flowInterfaceNamespace),
                    new ModuleParameterGroup(item.parameterGroup),
                    new ModuleName(item.name),
                    new ModuleParameterName(item.parameterName),
                    new ModuleParameterValue(item.parameterValue),
                    new ModuleCreatedAt(item.createdAt),
                    new ModuleUpdatedAt(item.updatedAt),
                    new ModuleDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return BplusItSappiModule.register(
            new ModuleId(module.id),
            new ModuleTenantId(module.tenantId),
            new ModuleSystemId(module.systemId),
            new ModuleSystemName(module.systemName),
            new ModuleChannelId(module.channelId),
            new ModuleChannelParty(module.channelParty),
            new ModuleChannelComponent(module.channelComponent),
            new ModuleChannelName(module.channelName),
            new ModuleFlowParty(module.flowParty),
            new ModuleFlowComponent(module.flowComponent),
            new ModuleFlowInterfaceName(module.flowInterfaceName),
            new ModuleFlowInterfaceNamespace(module.flowInterfaceNamespace),
            new ModuleParameterGroup(module.parameterGroup),
            new ModuleName(module.name),
            new ModuleParameterName(module.parameterName),
            new ModuleParameterValue(module.parameterValue),
            new ModuleCreatedAt(module.createdAt),
            new ModuleUpdatedAt(module.updatedAt),
            new ModuleDeletedAt(module.deletedAt),
            
        );
    }
}