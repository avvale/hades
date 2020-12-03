import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IPartnerRepository } from '@hades/origen/partner/domain/partner.repository';
import {
    PartnerId,
    PartnerName,
    PartnerSocialNetworks,
    PartnerDescription,
    PartnerExcerpt,
    PartnerEmail,
    PartnerPhone,
    PartnerFax,
    PartnerCountryCommonId,
    PartnerAdministrativeAreaLevel1Id,
    PartnerAdministrativeAreaLevel2Id,
    PartnerAdministrativeAreaLevel3Id,
    PartnerZip,
    PartnerLocality,
    PartnerAddress,
    PartnerLatitude,
    PartnerLongitude,
    PartnerCreatedAt,
    PartnerUpdatedAt,
    PartnerDeletedAt,
} from '@hades/origen/partner/domain/value-objects';
import { OrigenPartner } from './../../domain/partner.aggregate';
import { partners } from './../seeds/partner.seed';

@Injectable()
export class MockPartnerRepository extends MockRepository<OrigenPartner> implements IPartnerRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OrigenPartner';
    public collectionSource: OrigenPartner[];
    public deletedAtInstance: PartnerDeletedAt = new PartnerDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset()
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>partners)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(OrigenPartner.register(
                    new PartnerId(itemCollection.id),
                    new PartnerName(itemCollection.name),
                    new PartnerSocialNetworks(itemCollection.socialNetworks),
                    new PartnerDescription(itemCollection.description),
                    new PartnerExcerpt(itemCollection.excerpt),
                    new PartnerEmail(itemCollection.email),
                    new PartnerPhone(itemCollection.phone),
                    new PartnerFax(itemCollection.fax),
                    new PartnerCountryCommonId(itemCollection.countryCommonId),
                    new PartnerAdministrativeAreaLevel1Id(itemCollection.administrativeAreaLevel1Id),
                    new PartnerAdministrativeAreaLevel2Id(itemCollection.administrativeAreaLevel2Id),
                    new PartnerAdministrativeAreaLevel3Id(itemCollection.administrativeAreaLevel3Id),
                    new PartnerZip(itemCollection.zip),
                    new PartnerLocality(itemCollection.locality),
                    new PartnerAddress(itemCollection.address),
                    new PartnerLatitude(itemCollection.latitude),
                    new PartnerLongitude(itemCollection.longitude),
                    new PartnerCreatedAt(itemCollection.createdAt),
                    new PartnerUpdatedAt(itemCollection.updatedAt),
                    new PartnerDeletedAt(itemCollection.deletedAt),
                ));
        }
    }
}