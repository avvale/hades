import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IAdministrativeAreaLevel3Repository } from '@hades/admin/administrative-area-level-3/domain/administrative-area-level-3.repository';
import {
    AdministrativeAreaLevel3Id,
    AdministrativeAreaLevel3CountryCommonId,
    AdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    AdministrativeAreaLevel3Code,
    AdministrativeAreaLevel3CustomCode,
    AdministrativeAreaLevel3Name,
    AdministrativeAreaLevel3Slug,
    AdministrativeAreaLevel3Latitude,
    AdministrativeAreaLevel3Longitude,
    AdministrativeAreaLevel3Zoom,
    AdministrativeAreaLevel3CreatedAt,
    AdministrativeAreaLevel3UpdatedAt,
    AdministrativeAreaLevel3DeletedAt,
} from '@hades/admin/administrative-area-level-3/domain/value-objects';
import { AdminAdministrativeAreaLevel3 } from './../../domain/administrative-area-level-3.aggregate';
import { administrativeAreasLevel3 } from './../seeds/administrative-area-level-3.seed';

@Injectable()
export class MockAdministrativeAreaLevel3Repository extends MockRepository<AdminAdministrativeAreaLevel3> implements IAdministrativeAreaLevel3Repository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AdminAdministrativeAreaLevel3';
    public collectionSource: AdminAdministrativeAreaLevel3[];
    public deletedAtInstance: AdministrativeAreaLevel3DeletedAt = new AdministrativeAreaLevel3DeletedAt(null);

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

        for (const itemCollection of <any[]>administrativeAreasLevel3)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AdminAdministrativeAreaLevel3.register(
                    new AdministrativeAreaLevel3Id(itemCollection.id),
                    new AdministrativeAreaLevel3CountryCommonId(itemCollection.countryCommonId),
                    new AdministrativeAreaLevel3AdministrativeAreaLevel1Id(itemCollection.administrativeAreaLevel1Id),
                    new AdministrativeAreaLevel3AdministrativeAreaLevel2Id(itemCollection.administrativeAreaLevel2Id),
                    new AdministrativeAreaLevel3Code(itemCollection.code),
                    new AdministrativeAreaLevel3CustomCode(itemCollection.customCode),
                    new AdministrativeAreaLevel3Name(itemCollection.name),
                    new AdministrativeAreaLevel3Slug(itemCollection.slug),
                    new AdministrativeAreaLevel3Latitude(itemCollection.latitude),
                    new AdministrativeAreaLevel3Longitude(itemCollection.longitude),
                    new AdministrativeAreaLevel3Zoom(itemCollection.zoom),
                    new AdministrativeAreaLevel3CreatedAt(itemCollection.createdAt),
                    new AdministrativeAreaLevel3UpdatedAt(itemCollection.updatedAt),
                    new AdministrativeAreaLevel3DeletedAt(itemCollection.deletedAt),
                ));
        }
    }
}