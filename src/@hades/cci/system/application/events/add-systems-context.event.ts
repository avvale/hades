import { AggregateRoot } from '@nestjs/cqrs';
import { CciSystem } from './../../domain/system.aggregate';
import { CreatedSystemEvent } from './created-system.event';
import { CreatedSystemsEvent } from './created-systems.event';
import { DeletedSystemEvent } from './deleted-system.event';
import { DeletedSystemsEvent } from './deleted-systems.event';

export class AddSystemsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: CciSystem[] = [],
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
                        system.tenantCode.value,
                        system.version.value,
                        system.name.value,
                        system.environment.value,
                        system.technology.value,
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
                        system.tenantCode.value,
                        system.version.value,
                        system.name.value,
                        system.environment.value,
                        system.technology.value,
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