import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
} from './../../domain/value-objects';
import { IAdministrativeAreaLevel3Repository } from './../../domain/administrative-area-level-3.repository';
import { AdminAdministrativeAreaLevel3 } from './../../domain/administrative-area-level-3.aggregate';

@Injectable()
export class CreateAdministrativeAreaLevel3Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAdministrativeAreaLevel3Repository,
    ) {}

    public async main(
        payload: {
            id: AdministrativeAreaLevel3Id,
            countryCommonId: AdministrativeAreaLevel3CountryCommonId,
            administrativeAreaLevel1Id: AdministrativeAreaLevel3AdministrativeAreaLevel1Id,
            administrativeAreaLevel2Id: AdministrativeAreaLevel3AdministrativeAreaLevel2Id,
            code: AdministrativeAreaLevel3Code,
            customCode: AdministrativeAreaLevel3CustomCode,
            name: AdministrativeAreaLevel3Name,
            slug: AdministrativeAreaLevel3Slug,
            latitude: AdministrativeAreaLevel3Latitude,
            longitude: AdministrativeAreaLevel3Longitude,
            zoom: AdministrativeAreaLevel3Zoom,
        }
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const administrativeAreaLevel3 = AdminAdministrativeAreaLevel3.register(
            payload.id,
            payload.countryCommonId,
            payload.administrativeAreaLevel1Id,
            payload.administrativeAreaLevel2Id,
            payload.code,
            payload.customCode,
            payload.name,
            payload.slug,
            payload.latitude,
            payload.longitude,
            payload.zoom,
            new AdministrativeAreaLevel3CreatedAt({currentTimestamp: true}),
            new AdministrativeAreaLevel3UpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create(administrativeAreaLevel3);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const administrativeAreaLevel3Register = this.publisher.mergeObjectContext(
            administrativeAreaLevel3
        );

        administrativeAreaLevel3Register.created(administrativeAreaLevel3); // apply event to model events
        administrativeAreaLevel3Register.commit(); // commit all events of model
    }
}