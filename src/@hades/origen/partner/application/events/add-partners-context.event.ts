import { AggregateRoot } from '@nestjs/cqrs';
import { OrigenPartner } from './../../domain/partner.aggregate';
import { CreatedPartnerEvent } from './created-partner.event';
import { DeletedPartnerEvent } from './deleted-partner.event';
import { CreatedPartnersEvent } from './created-partners.event';
import { DeletedPartnersEvent } from './deleted-partners.event';

export class AddPartnersContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: OrigenPartner[] = [],
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
            new CreatedPartnersEvent(
                this.aggregateRoots.map(partner =>
                    new CreatedPartnerEvent(
                        partner.id.value,
                        partner.name.value,
                        partner.socialNetworks?.value,
                        partner.description?.value,
                        partner.excerpt?.value,
                        partner.email?.value,
                        partner.phone?.value,
                        partner.fax?.value,
                        partner.countryCommonId.value,
                        partner.administrativeAreaLevel1Id?.value,
                        partner.administrativeAreaLevel2Id?.value,
                        partner.administrativeAreaLevel3Id?.value,
                        partner.zip?.value,
                        partner.locality?.value,
                        partner.address?.value,
                        partner.latitude?.value,
                        partner.longitude?.value,
                        partner.createdAt?.value,
                        partner.updatedAt?.value,
                        partner.deletedAt?.value,
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedPartnersEvent(
                this.aggregateRoots.map(partner =>
                    new DeletedPartnerEvent(
                        partner.id.value,
                        partner.name.value,
                        partner.socialNetworks?.value,
                        partner.description?.value,
                        partner.excerpt?.value,
                        partner.email?.value,
                        partner.phone?.value,
                        partner.fax?.value,
                        partner.countryCommonId.value,
                        partner.administrativeAreaLevel1Id?.value,
                        partner.administrativeAreaLevel2Id?.value,
                        partner.administrativeAreaLevel3Id?.value,
                        partner.zip?.value,
                        partner.locality?.value,
                        partner.address?.value,
                        partner.latitude?.value,
                        partner.longitude?.value,
                        partner.createdAt?.value,
                        partner.updatedAt?.value,
                        partner.deletedAt?.value,
                    )
                )
            )
        );
    }
}