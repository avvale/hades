import { AggregateRoot } from '@nestjs/cqrs';
import { BplusItSappiModule } from './../../domain/module.aggregate';
import { CreatedModuleEvent } from './created-module.event';
import { DeletedModuleEvent } from './deleted-module.event';
import { CreatedModulesEvent } from './created-modules.event';
import { DeletedModulesEvent } from './deleted-modules.event';

export class AddModulesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: BplusItSappiModule[] = []
    ) {
        super();
    }

    *[Symbol.iterator]()
    { 
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot; 
    }

    created()
    {
        this.apply(
            new CreatedModulesEvent(
                this.aggregateRoots.map(module => 
                    new CreatedModuleEvent(
                        module.id.value,
                        module.tenantId.value,
                        module.systemId.value,
                        module.systemName.value,
                        module.channelId.value,
                        module.channelParty?.value,
                        module.channelComponent.value,
                        module.channelName.value,
                        module.flowParty?.value,
                        module.flowComponent.value,
                        module.flowInterfaceName.value,
                        module.flowInterfaceNamespace.value,
                        module.parameterGroup?.value,
                        module.name?.value,
                        module.parameterName?.value,
                        module.parameterValue?.value,
                        module.createdAt?.value,
                        module.updatedAt?.value,
                        module.deletedAt?.value,
                        
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedModulesEvent(
                this.aggregateRoots.map(module => 
                    new DeletedModuleEvent(
                        module.id.value,
                        module.tenantId.value,
                        module.systemId.value,
                        module.systemName.value,
                        module.channelId.value,
                        module.channelParty?.value,
                        module.channelComponent.value,
                        module.channelName.value,
                        module.flowParty?.value,
                        module.flowComponent.value,
                        module.flowInterfaceName.value,
                        module.flowInterfaceNamespace.value,
                        module.parameterGroup?.value,
                        module.name?.value,
                        module.parameterName?.value,
                        module.parameterValue?.value,
                        module.createdAt?.value,
                        module.updatedAt?.value,
                        module.deletedAt?.value,
                           
                    )
                )
            )
        );
    }   
}