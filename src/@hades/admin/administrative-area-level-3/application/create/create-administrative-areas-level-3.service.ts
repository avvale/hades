import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    AdministrativeAreaLevel3Id,
    AdministrativeAreaLevel3CountryId,
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
import { AddAdministrativeAreasLevel3ContextEvent } from './../events/add-administrative-areas-level-3-context.event';

@Injectable()
export class CreateAdministrativeAreasLevel3Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAdministrativeAreaLevel3Repository,
    ) {}

    public async main(
        administrativeAreasLevel3: {
            id: AdministrativeAreaLevel3Id,
            countryId: AdministrativeAreaLevel3CountryId,
            administrativeAreaLevel1Id: AdministrativeAreaLevel3AdministrativeAreaLevel1Id,
            administrativeAreaLevel2Id: AdministrativeAreaLevel3AdministrativeAreaLevel2Id,
            code: AdministrativeAreaLevel3Code,
            customCode: AdministrativeAreaLevel3CustomCode,
            name: AdministrativeAreaLevel3Name,
            slug: AdministrativeAreaLevel3Slug,
            latitude: AdministrativeAreaLevel3Latitude,
            longitude: AdministrativeAreaLevel3Longitude,
            zoom: AdministrativeAreaLevel3Zoom,
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAdministrativeAreasLevel3 = administrativeAreasLevel3.map(administrativeAreaLevel3 => AdminAdministrativeAreaLevel3.register(
            administrativeAreaLevel3.id,
            administrativeAreaLevel3.countryId,
            administrativeAreaLevel3.administrativeAreaLevel1Id,
            administrativeAreaLevel3.administrativeAreaLevel2Id,
            administrativeAreaLevel3.code,
            administrativeAreaLevel3.customCode,
            administrativeAreaLevel3.name,
            administrativeAreaLevel3.slug,
            administrativeAreaLevel3.latitude,
            administrativeAreaLevel3.longitude,
            administrativeAreaLevel3.zoom,
            new AdministrativeAreaLevel3CreatedAt({currentTimestamp: true}),
            new AdministrativeAreaLevel3UpdatedAt({currentTimestamp: true}),
            null
        ));

        // insert
        await this.repository.insert(aggregateAdministrativeAreasLevel3);

        // create AddAdministrativeAreasLevel3ContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const administrativeAreasLevel3Registered = this.publisher.mergeObjectContext(new AddAdministrativeAreasLevel3ContextEvent(aggregateAdministrativeAreasLevel3));

        administrativeAreasLevel3Registered.created(); // apply event to model events
        administrativeAreasLevel3Registered.commit(); // commit all events of model
    }
}