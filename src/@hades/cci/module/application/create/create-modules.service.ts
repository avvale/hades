import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
    
} from './../../domain/value-objects';
import { IModuleRepository } from './../../domain/module.repository';
import { CciModule } from './../../domain/module.aggregate';
import { AddModulesContextEvent } from './../events/add-modules-context.event';

@Injectable()
export class CreateModulesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IModuleRepository
    ) {}

    public async main(
        modules: {
            id: ModuleId,
            tenantId: ModuleTenantId,
            tenantCode: ModuleTenantCode,
            systemId: ModuleSystemId,
            systemName: ModuleSystemName,
            channelHash: ModuleChannelHash,
            channelParty: ModuleChannelParty,
            channelComponent: ModuleChannelComponent,
            channelName: ModuleChannelName,
            flowHash: ModuleFlowHash,
            flowParty: ModuleFlowParty,
            flowReceiverParty: ModuleFlowReceiverParty,
            flowComponent: ModuleFlowComponent,
            flowReceiverComponent: ModuleFlowReceiverComponent,
            flowInterfaceName: ModuleFlowInterfaceName,
            flowInterfaceNamespace: ModuleFlowInterfaceNamespace,
            version: ModuleVersion,
            parameterGroup: ModuleParameterGroup,
            name: ModuleName,
            parameterName: ModuleParameterName,
            parameterValue: ModuleParameterValue,
            
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateModules = modules.map(module => CciModule.register(
            module.id,
            module.tenantId,
            module.tenantCode,
            module.systemId,
            module.systemName,
            module.channelHash,
            module.channelParty,
            module.channelComponent,
            module.channelName,
            module.flowHash,
            module.flowParty,
            module.flowReceiverParty,
            module.flowComponent,
            module.flowReceiverComponent,
            module.flowInterfaceName,
            module.flowInterfaceNamespace,
            module.version,
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

        // create AddModulesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const modulesRegistered = this.publisher.mergeObjectContext(new AddModulesContextEvent(aggregateModules));
 
        modulesRegistered.created(); // apply event to model events
        modulesRegistered.commit(); // commit all events of model
    }
}