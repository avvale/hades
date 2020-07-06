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
export class InsertModulesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IModuleRepository
    ) {}

    public async main(
        modules: {
            id: ModuleId,
            tenantId: ModuleTenantId,
            systemId: ModuleSystemId,
            systemName: ModuleSystemName,
            channelId: ModuleChannelId,
            channelParty: ModuleChannelParty,
            channelComponent: ModuleChannelComponent,
            channelName: ModuleChannelName,
            flowParty: ModuleFlowParty,
            flowComponent: ModuleFlowComponent,
            flowInterfaceName: ModuleFlowInterfaceName,
            flowInterfaceNamespace: ModuleFlowInterfaceNamespace,
            parameterGroup: ModuleParameterGroup,
            name: ModuleName,
            parameterName: ModuleParameterName,
            parameterValue: ModuleParameterValue,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateModules = modules.map(module => BplusItSappiModule.register(
            module.id,
            module.tenantId,
            module.systemId,
            module.systemName,
            module.channelId,
            module.channelParty,
            module.channelComponent,
            module.channelName,
            module.flowParty,
            module.flowComponent,
            module.flowInterfaceName,
            module.flowInterfaceNamespace,
            module.parameterGroup,
            module.name,
            module.parameterName,
            module.parameterValue,
            new ModuleCreatedAt(Utils.nowTimestamp()),
            new ModuleUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateModules);

        // TODO a falta de definir eventos
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        // const modulesRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id)
        // );
        // 
        // modulesRegistered.created(modules); // apply event to model events
        // modulesRegistered.commit(); // commit all events of model
    }
}