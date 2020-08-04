import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    ModuleId, 
    ModuleTenantId, 
    ModuleTenantCode, 
    ModuleSystemId, 
    ModuleSystemName, 
    ModuleChannelId, 
    ModuleChannelParty, 
    ModuleChannelComponent, 
    ModuleChannelName, 
    ModuleFlowHash, 
    ModuleFlowParty, 
    ModuleFlowComponent, 
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
    
} from './../../domain/value-objects';
import { IModuleRepository } from './../../domain/module.repository';
import { BplusItSappiModule } from './../../domain/module.aggregate';

@Injectable()
export class UpdateModuleService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IModuleRepository
    ) {}

    public async main(
        id: ModuleId,
        tenantId?: ModuleTenantId,
        tenantCode?: ModuleTenantCode,
        systemId?: ModuleSystemId,
        systemName?: ModuleSystemName,
        channelId?: ModuleChannelId,
        channelParty?: ModuleChannelParty,
        channelComponent?: ModuleChannelComponent,
        channelName?: ModuleChannelName,
        flowHash?: ModuleFlowHash,
        flowParty?: ModuleFlowParty,
        flowComponent?: ModuleFlowComponent,
        flowInterfaceName?: ModuleFlowInterfaceName,
        flowInterfaceNamespace?: ModuleFlowInterfaceNamespace,
        version?: ModuleVersion,
        parameterGroup?: ModuleParameterGroup,
        name?: ModuleName,
        parameterName?: ModuleParameterName,
        parameterValue?: ModuleParameterValue,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const module = BplusItSappiModule.register(
            id,
            tenantId,
            tenantCode,
            systemId,
            systemName,
            channelId,
            channelParty,
            channelComponent,
            channelName,
            flowHash,
            flowParty,
            flowComponent,
            flowInterfaceName,
            flowInterfaceNamespace,
            version,
            parameterGroup,
            name,
            parameterName,
            parameterValue,
            null,
            new ModuleUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(module);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const moduleRegister = this.publisher.mergeObjectContext(
            module
        );
        
        moduleRegister.updated(module); // apply event to model events
        moduleRegister.commit(); // commit all events of model
    }
}