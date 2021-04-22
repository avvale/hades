import { AggregateRoot } from '@nestjs/cqrs';
import { AdminAdministrativeAreaLevel1 } from './../../domain/administrative-area-level-1.aggregate';
import { CreatedAdministrativeAreaLevel1Event } from './created-administrative-area-level-1.event';
import { CreatedAdministrativeAreasLevel1Event } from './created-administrative-areas-level-1.event';
import { DeletedAdministrativeAreaLevel1Event } from './deleted-administrative-area-level-1.event';
import { DeletedAdministrativeAreasLevel1Event } from './deleted-administrative-areas-level-1.event';

export class AddAdministrativeAreasLevel1ContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AdminAdministrativeAreaLevel1[] = [],
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
            new CreatedAdministrativeAreasLevel1Event(
                this.aggregateRoots.map(administrativeAreaLevel1 =>
                    new CreatedAdministrativeAreaLevel1Event(
                        administrativeAreaLevel1.id.value,
                        administrativeAreaLevel1.countryCommonId.value,
                        administrativeAreaLevel1.code.value,
                        administrativeAreaLevel1.customCode?.value,
                        administrativeAreaLevel1.name.value,
                        administrativeAreaLevel1.slug.value,
                        administrativeAreaLevel1.latitude?.value,
                        administrativeAreaLevel1.longitude?.value,
                        administrativeAreaLevel1.zoom?.value,
                        administrativeAreaLevel1.createdAt?.value,
                        administrativeAreaLevel1.updatedAt?.value,
                        administrativeAreaLevel1.deletedAt?.value,
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedAdministrativeAreasLevel1Event(
                this.aggregateRoots.map(administrativeAreaLevel1 =>
                    new DeletedAdministrativeAreaLevel1Event(
                        administrativeAreaLevel1.id.value,
                        administrativeAreaLevel1.countryCommonId.value,
                        administrativeAreaLevel1.code.value,
                        administrativeAreaLevel1.customCode?.value,
                        administrativeAreaLevel1.name.value,
                        administrativeAreaLevel1.slug.value,
                        administrativeAreaLevel1.latitude?.value,
                        administrativeAreaLevel1.longitude?.value,
                        administrativeAreaLevel1.zoom?.value,
                        administrativeAreaLevel1.createdAt?.value,
                        administrativeAreaLevel1.updatedAt?.value,
                        administrativeAreaLevel1.deletedAt?.value,
                    )
                )
            )
        );
    }
}