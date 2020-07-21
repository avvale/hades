import { AggregateRoot } from '@nestjs/cqrs';
import { BplusItSappiSystem } from './../../domain/system.aggregate';
import { CreatedSystemEvent } from './created-system.event';
import { DeletedSystemEvent } from './deleted-system.event';
import { CreatedSystemsEvent } from './created-systems.event';
import { DeletedSystemsEvent } from './deleted-systems.event';

export class AddSystemsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: BplusItSappiSystem[] = []
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
            new CreatedSystemsEvent(
                this.aggregateRoots.map(system => 
                    new CreatedSystemEvent(
                        system.id.value,
                        system.tenantId.value,
                        system.name.value,
                        system.tenantCode.value,
                        system.environment.value,
                        system.version.value,
                        system.isActive.value,
                        system.cancelledAt?.value,
                        system.createdAt?.value,
                        system.updatedAt?.value,
                        system.deletedAt?.value,
                        
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedSystemsEvent(
                this.aggregateRoots.map(system => 
                    new DeletedSystemEvent(
                        system.id.value,
                        system.tenantId.value,
                        system.name.value,
                        system.tenantCode.value,
                        system.environment.value,
                        system.version.value,
                        system.isActive.value,
                        system.cancelledAt?.value,
                        system.createdAt?.value,
                        system.updatedAt?.value,
                        system.deletedAt?.value,
                           
                    )
                )
            )
        );
    }   
}