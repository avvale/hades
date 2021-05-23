import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/domain/administrative-area-level-1.repository';
import {
    AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel1CountryId,
    AdministrativeAreaLevel1Code,
    AdministrativeAreaLevel1CustomCode,
    AdministrativeAreaLevel1Name,
    AdministrativeAreaLevel1Slug,
    AdministrativeAreaLevel1Latitude,
    AdministrativeAreaLevel1Longitude,
    AdministrativeAreaLevel1Zoom,
    AdministrativeAreaLevel1CreatedAt,
    AdministrativeAreaLevel1UpdatedAt,
    AdministrativeAreaLevel1DeletedAt,
} from '@hades/admin/administrative-area-level-1/domain/value-objects';
import { AdminAdministrativeAreaLevel1 } from './../../domain/administrative-area-level-1.aggregate';
import { administrativeAreasLevel1 } from './../seeds/administrative-area-level-1.seed';

@Injectable()
export class MockAdministrativeAreaLevel1Repository extends MockRepository<AdminAdministrativeAreaLevel1> implements IAdministrativeAreaLevel1Repository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AdminAdministrativeAreaLevel1';
    public collectionSource: AdminAdministrativeAreaLevel1[];
    public deletedAtInstance: AdministrativeAreaLevel1DeletedAt = new AdministrativeAreaLevel1DeletedAt(null);

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

        for (const itemCollection of <any[]>administrativeAreasLevel1)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AdminAdministrativeAreaLevel1.register(
                    new AdministrativeAreaLevel1Id(itemCollection.id),
                    new AdministrativeAreaLevel1CountryId(itemCollection.countryId),
                    new AdministrativeAreaLevel1Code(itemCollection.code),
                    new AdministrativeAreaLevel1CustomCode(itemCollection.customCode),
                    new AdministrativeAreaLevel1Name(itemCollection.name),
                    new AdministrativeAreaLevel1Slug(itemCollection.slug),
                    new AdministrativeAreaLevel1Latitude(itemCollection.latitude),
                    new AdministrativeAreaLevel1Longitude(itemCollection.longitude),
                    new AdministrativeAreaLevel1Zoom(itemCollection.zoom),
                    new AdministrativeAreaLevel1CreatedAt(itemCollection.createdAt),
                    new AdministrativeAreaLevel1UpdatedAt(itemCollection.updatedAt),
                    new AdministrativeAreaLevel1DeletedAt(itemCollection.deletedAt),
                ));
        }
    }
}