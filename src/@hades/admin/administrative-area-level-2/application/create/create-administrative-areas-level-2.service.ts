import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    AdministrativeAreaLevel2Id,
    AdministrativeAreaLevel2CountryId,
    AdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel2Code,
    AdministrativeAreaLevel2CustomCode,
    AdministrativeAreaLevel2Name,
    AdministrativeAreaLevel2Slug,
    AdministrativeAreaLevel2Latitude,
    AdministrativeAreaLevel2Longitude,
    AdministrativeAreaLevel2Zoom,
    AdministrativeAreaLevel2CreatedAt,
    AdministrativeAreaLevel2UpdatedAt,
    AdministrativeAreaLevel2DeletedAt,
} from './../../domain/value-objects';
import { IAdministrativeAreaLevel2Repository } from './../../domain/administrative-area-level-2.repository';
import { AdminAdministrativeAreaLevel2 } from './../../domain/administrative-area-level-2.aggregate';
import { AddAdministrativeAreasLevel2ContextEvent } from './../events/add-administrative-areas-level-2-context.event';

@Injectable()
export class CreateAdministrativeAreasLevel2Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAdministrativeAreaLevel2Repository,
    ) {}

    public async main(
        administrativeAreasLevel2: {
            id: AdministrativeAreaLevel2Id,
            countryId: AdministrativeAreaLevel2CountryId,
            administrativeAreaLevel1Id: AdministrativeAreaLevel2AdministrativeAreaLevel1Id,
            code: AdministrativeAreaLevel2Code,
            customCode: AdministrativeAreaLevel2CustomCode,
            name: AdministrativeAreaLevel2Name,
            slug: AdministrativeAreaLevel2Slug,
            latitude: AdministrativeAreaLevel2Latitude,
            longitude: AdministrativeAreaLevel2Longitude,
            zoom: AdministrativeAreaLevel2Zoom,
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAdministrativeAreasLevel2 = administrativeAreasLevel2.map(administrativeAreaLevel2 => AdminAdministrativeAreaLevel2.register(
            administrativeAreaLevel2.id,
            administrativeAreaLevel2.countryId,
            administrativeAreaLevel2.administrativeAreaLevel1Id,
            administrativeAreaLevel2.code,
            administrativeAreaLevel2.customCode,
            administrativeAreaLevel2.name,
            administrativeAreaLevel2.slug,
            administrativeAreaLevel2.latitude,
            administrativeAreaLevel2.longitude,
            administrativeAreaLevel2.zoom,
            new AdministrativeAreaLevel2CreatedAt({currentTimestamp: true}),
            new AdministrativeAreaLevel2UpdatedAt({currentTimestamp: true}),
            null
        ));

        // insert
        await this.repository.insert(aggregateAdministrativeAreasLevel2);

        // create AddAdministrativeAreasLevel2ContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const administrativeAreasLevel2Registered = this.publisher.mergeObjectContext(new AddAdministrativeAreasLevel2ContextEvent(aggregateAdministrativeAreasLevel2));

        administrativeAreasLevel2Registered.created(); // apply event to model events
        administrativeAreasLevel2Registered.commit(); // commit all events of model
    }
}