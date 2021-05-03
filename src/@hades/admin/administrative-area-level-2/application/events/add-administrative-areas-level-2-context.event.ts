import { AggregateRoot } from '@nestjs/cqrs';
import { AdminAdministrativeAreaLevel2 } from './../../domain/administrative-area-level-2.aggregate';
import { CreatedAdministrativeAreaLevel2Event } from './created-administrative-area-level-2.event';
import { CreatedAdministrativeAreasLevel2Event } from './created-administrative-areas-level-2.event';
import { DeletedAdministrativeAreaLevel2Event } from './deleted-administrative-area-level-2.event';
import { DeletedAdministrativeAreasLevel2Event } from './deleted-administrative-areas-level-2.event';

export class AddAdministrativeAreasLevel2ContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AdminAdministrativeAreaLevel2[] = [],
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
            new CreatedAdministrativeAreasLevel2Event(
                this.aggregateRoots.map(administrativeAreaLevel2 =>
                    new CreatedAdministrativeAreaLevel2Event(
                        administrativeAreaLevel2.id.value,
                        administrativeAreaLevel2.countryId.value,
                        administrativeAreaLevel2.administrativeAreaLevel1Id.value,
                        administrativeAreaLevel2.code.value,
                        administrativeAreaLevel2.customCode?.value,
                        administrativeAreaLevel2.name.value,
                        administrativeAreaLevel2.slug.value,
                        administrativeAreaLevel2.latitude?.value,
                        administrativeAreaLevel2.longitude?.value,
                        administrativeAreaLevel2.zoom?.value,
                        administrativeAreaLevel2.createdAt?.value,
                        administrativeAreaLevel2.updatedAt?.value,
                        administrativeAreaLevel2.deletedAt?.value,
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedAdministrativeAreasLevel2Event(
                this.aggregateRoots.map(administrativeAreaLevel2 =>
                    new DeletedAdministrativeAreaLevel2Event(
                        administrativeAreaLevel2.id.value,
                        administrativeAreaLevel2.countryId.value,
                        administrativeAreaLevel2.administrativeAreaLevel1Id.value,
                        administrativeAreaLevel2.code.value,
                        administrativeAreaLevel2.customCode?.value,
                        administrativeAreaLevel2.name.value,
                        administrativeAreaLevel2.slug.value,
                        administrativeAreaLevel2.latitude?.value,
                        administrativeAreaLevel2.longitude?.value,
                        administrativeAreaLevel2.zoom?.value,
                        administrativeAreaLevel2.createdAt?.value,
                        administrativeAreaLevel2.updatedAt?.value,
                        administrativeAreaLevel2.deletedAt?.value,
                    )
                )
            )
        );
    }
}