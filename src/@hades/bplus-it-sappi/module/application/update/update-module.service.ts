import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
        systemId?: ModuleSystemId,
        systemName?: ModuleSystemName,
        channelId?: ModuleChannelId,
        channelParty?: ModuleChannelParty,
        channelComponent?: ModuleChannelComponent,
        channelName?: ModuleChannelName,
        flowParty?: ModuleFlowParty,
        flowComponent?: ModuleFlowComponent,
        flowInterfaceName?: ModuleFlowInterfaceName,
        flowInterfaceNamespace?: ModuleFlowInterfaceNamespace,
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
            systemId,
            systemName,
            channelId,
            channelParty,
            channelComponent,
            channelName,
            flowParty,
            flowComponent,
            flowInterfaceName,
            flowInterfaceNamespace,
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
            
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const moduleRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        moduleRegister.updated(module); // apply event to model events
        moduleRegister.commit(); // commit all events of model
    }
}