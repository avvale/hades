import { AggregateRoot } from '@nestjs/cqrs';
import { BplusItSappiFlow } from './../../domain/flow.aggregate';
import { CreatedFlowEvent } from './created-flow.event';
import { DeletedFlowEvent } from './deleted-flow.event';
import { CreatedFlowsEvent } from './created-flows.event';
import { DeletedFlowsEvent } from './deleted-flows.event';

export class AddFlowsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: BplusItSappiFlow[] = []
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
            new CreatedFlowsEvent(
                this.aggregateRoots.map(flow => 
                    new CreatedFlowEvent(
                        flow.id.value,
                        flow.tenantId.value,
                        flow.tenantCode.value,
                        flow.systemId.value,
                        flow.systemName.value,
                        flow.scenario.value,
                        flow.party?.value,
                        flow.component.value,
                        flow.interfaceName.value,
                        flow.interfaceNamespace.value,
                        flow.iflowName?.value,
                        flow.responsibleUserAccount?.value,
                        flow.lastChangeUserAccount?.value,
                        flow.lastChangedAt?.value,
                        flow.folderPath?.value,
                        flow.description?.value,
                        flow.application?.value,
                        flow.isCritical.value,
                        flow.isComplex.value,
                        flow.fieldGroupId?.value,
                        flow.data?.value,
                        flow.createdAt?.value,
                        flow.updatedAt?.value,
                        flow.deletedAt?.value,
                        
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedFlowsEvent(
                this.aggregateRoots.map(flow => 
                    new DeletedFlowEvent(
                        flow.id.value,
                        flow.tenantId.value,
                        flow.tenantCode.value,
                        flow.systemId.value,
                        flow.systemName.value,
                        flow.scenario.value,
                        flow.party?.value,
                        flow.component.value,
                        flow.interfaceName.value,
                        flow.interfaceNamespace.value,
                        flow.iflowName?.value,
                        flow.responsibleUserAccount?.value,
                        flow.lastChangeUserAccount?.value,
                        flow.lastChangedAt?.value,
                        flow.folderPath?.value,
                        flow.description?.value,
                        flow.application?.value,
                        flow.isCritical.value,
                        flow.isComplex.value,
                        flow.fieldGroupId?.value,
                        flow.data?.value,
                        flow.createdAt?.value,
                        flow.updatedAt?.value,
                        flow.deletedAt?.value,
                           
                    )
                )
            )
        );
    }   
}